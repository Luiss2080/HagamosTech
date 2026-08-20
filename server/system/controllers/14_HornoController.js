const prisma = require('../../models/prisma');

const generarCodigo = (tipo) => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const yyyy = hoy.getFullYear();
    const prefijo = tipo === 'merma' ? 'M' : 'H';
    return `${prefijo}-${yyyy}${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const ajustarStock = async (productoId, sucursalId, tipo, cantidad, codigo, motivo) => {
    const delta = tipo === 'merma' ? -cantidad : cantidad;
    await prisma.inventarioSucursal.upsert({
        where: { sucursalId_productoId: { sucursalId, productoId } },
        create: { sucursalId, productoId, stock: Math.max(0, delta), minimo: 5 },
        update: { stock: { increment: delta } }
    });
    await prisma.movimientoInventario.create({
        data: {
            productoId,
            sucursalId,
            tipo: tipo === 'merma' ? 'merma' : 'entrada',
            cantidad,
            motivo: motivo || (tipo === 'merma' ? 'Merma de horno' : 'Producción de horno'),
            referencia: codigo
        }
    });
};

const HornoController = {
    obtener: async (req, res) => {
        try {
            const registros = await prisma.produccionHorno.findMany({
                include: { producto: true, sucursal: true },
                orderBy: { creadoEn: 'desc' }
            });
            res.json({ success: true, registros });
        } catch (error) { console.error(error); res.status(500).json({ error: 'Error al obtener registros del horno' }); }
    },

    obtenerById: async (req, res) => {
        try {
            const registro = await prisma.produccionHorno.findUnique({ where: { id: Number(req.params.id) }, include: { producto: true, sucursal: true } });
            if (!registro) return res.status(404).json({ mensaje: 'Registro no encontrado' });
            res.json({ success: true, registro });
        } catch (error) { res.status(500).json({ error: 'Error al obtener el registro' }); }
    },

    crear: async (req, res) => {
        const { tipo, productoId, sucursalId, cantidad, motivo, observaciones } = req.body;
        try {
            if (!productoId || !sucursalId || !cantidad) return res.status(400).json({ mensaje: 'Producto, sucursal y cantidad son obligatorios' });
            const t = tipo === 'merma' ? 'merma' : 'produccion';
            const cant = parseInt(cantidad);
            if (cant <= 0) return res.status(400).json({ mensaje: 'La cantidad debe ser mayor a cero' });
            const codigo = generarCodigo(t);
            const registro = await prisma.produccionHorno.create({
                data: { codigo, tipo: t, productoId: parseInt(productoId), sucursalId: parseInt(sucursalId), cantidad: cant, motivo: motivo || null, observaciones: observaciones || null },
                include: { producto: true, sucursal: true }
            });
            await ajustarStock(registro.productoId, registro.sucursalId, t, cant, codigo, motivo);
            res.status(201).json({ success: true, registro });
        } catch (error) { console.error(error); res.status(500).json({ error: 'Error al registrar producción' }); }
    },

    editar: async (req, res) => {
        const id = Number(req.params.id);
        const { tipo, cantidad, motivo, observaciones } = req.body;
        try {
            const existente = await prisma.produccionHorno.findUnique({ where: { id } });
            if (!existente) return res.status(404).json({ mensaje: 'Registro no encontrado' });
            const t = tipo === 'merma' ? 'merma' : 'produccion';
            const cant = parseInt(cantidad) || existente.cantidad;

            // Revertir el efecto del registro anterior en el stock
            const deltaAnterior = existente.tipo === 'merma' ? -existente.cantidad : existente.cantidad;
            await prisma.inventarioSucursal.update({
                where: { sucursalId_productoId: { sucursalId: existente.sucursalId, productoId: existente.productoId } },
                data: { stock: { increment: -deltaAnterior } }
            });
            // Aplicar el nuevo efecto
            const nuevoDelta = t === 'merma' ? -cant : cant;
            await prisma.inventarioSucursal.update({
                where: { sucursalId_productoId: { sucursalId: existente.sucursalId, productoId: existente.productoId } },
                data: { stock: { increment: nuevoDelta } }
            });
            const registro = await prisma.produccionHorno.update({
                where: { id },
                data: { tipo: t, cantidad: cant, motivo: motivo || null, observaciones: observaciones !== undefined ? observaciones : existente.observaciones },
                include: { producto: true, sucursal: true }
            });
            res.json({ success: true, registro });
        } catch (error) { console.error(error); res.status(500).json({ error: 'Error al actualizar el registro' }); }
    },

    anular: async (req, res) => {
        const id = Number(req.params.id);
        try {
            const existente = await prisma.produccionHorno.findUnique({ where: { id } });
            if (!existente) return res.status(404).json({ mensaje: 'Registro no encontrado' });
            if (existente.estado === 'anulada') return res.json({ success: true });
            const delta = existente.tipo === 'merma' ? -existente.cantidad : existente.cantidad;
            await prisma.inventarioSucursal.update({
                where: { sucursalId_productoId: { sucursalId: existente.sucursalId, productoId: existente.productoId } },
                data: { stock: { increment: -delta } }
            });
            const registro = await prisma.produccionHorno.update({ where: { id }, data: { estado: 'anulada' }, include: { producto: true, sucursal: true } });
            res.json({ success: true, registro });
        } catch (error) { res.status(500).json({ error: 'Error al anular el registro' }); }
    },

    eliminar: async (req, res) => {
        try {
            await prisma.produccionHorno.delete({ where: { id: Number(req.params.id) } });
            res.json({ success: true });
        } catch (error) { res.status(500).json({ error: 'Error al eliminar el registro' }); }
    }
};

module.exports = HornoController;