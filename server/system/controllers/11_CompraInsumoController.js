const prisma = require('../../models/prisma');

const generarCodigo = () => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const yyyy = hoy.getFullYear();
    return `C-${yyyy}${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const registrarEntradaStock = async (productoId, sucursalId, cantidad, referencia, motivo) => {
    await prisma.inventarioSucursal.upsert({
        where: { sucursalId_productoId: { sucursalId, productoId } },
        create: { sucursalId, productoId, stock: cantidad, minimo: 5 },
        update: { stock: { increment: cantidad } }
    });
    await prisma.movimientoInventario.create({
        data: { productoId, sucursalId, tipo: 'entrada', cantidad, motivo: motivo || 'Compra a proveedor', referencia }
    });
};

const CompraInsumoController = {
    obtenerCompras: async (req, res) => {
        try {
            const compras = await prisma.compraInsumo.findMany({
                include: { producto: true, sucursal: true },
                orderBy: { creadoEn: 'desc' }
            });
            res.json({ success: true, compras });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener compras' });
        }
    },

    obtenerCompra: async (req, res) => {
        try {
            const compra = await prisma.compraInsumo.findUnique({
                where: { id: Number(req.params.id) },
                include: { producto: true, sucursal: true }
            });
            if (!compra) return res.status(404).json({ mensaje: 'Compra no encontrada' });
            res.json({ success: true, compra });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la compra' });
        }
    },

    crearCompra: async (req, res) => {
        const { productoId, sucursalId, proveedorNombre, proveedorContacto, cantidad, precioUnitario, observaciones } = req.body;
        try {
            if (!productoId || !sucursalId || !proveedorNombre || !cantidad || !precioUnitario) {
                return res.status(400).json({ mensaje: 'Producto, sucursal, proveedor, cantidad y precio son obligatorios' });
            }
            const cant = parseInt(cantidad);
            const precio = parseFloat(precioUnitario);
            const total = cant * precio;
            const compra = await prisma.compraInsumo.create({
                data: {
                    codigo: generarCodigo(),
                    productoId: parseInt(productoId),
                    sucursalId: parseInt(sucursalId),
                    proveedorNombre,
                    proveedorContacto: proveedorContacto || null,
                    cantidad: cant,
                    precioUnitario: precio,
                    total,
                    observaciones: observaciones || null
                },
                include: { producto: true, sucursal: true }
            });
            await registrarEntradaStock(compra.productoId, compra.sucursalId, cant, compra.codigo, `Compra #${compra.codigo} a ${proveedorNombre}`);
            res.status(201).json({ success: true, compra });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar la compra' });
        }
    },

    editarCompra: async (req, res) => {
        const id = Number(req.params.id);
        const { proveedorNombre, proveedorContacto, cantidad, precioUnitario, observaciones } = req.body;
        try {
            const existente = await prisma.compraInsumo.findUnique({ where: { id } });
            if (!existente) return res.status(404).json({ mensaje: 'Compra no encontrada' });
            const cant = parseInt(cantidad) || existente.cantidad;
            const precio = parseFloat(precioUnitario) || existente.precioUnitario;
            const compra = await prisma.compraInsumo.update({
                where: { id },
                data: {
                    proveedorNombre: proveedorNombre || existente.proveedorNombre,
                    proveedorContacto: proveedorContacto !== undefined ? proveedorContacto : existente.proveedorContacto,
                    cantidad: cant,
                    precioUnitario: precio,
                    total: cant * precio,
                    observaciones: observaciones !== undefined ? observaciones : existente.observaciones
                },
                include: { producto: true, sucursal: true }
            });
            res.json({ success: true, compra });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la compra' });
        }
    },

    anularCompra: async (req, res) => {
        const id = Number(req.params.id);
        try {
            const compra = await prisma.compraInsumo.findUnique({ where: { id } });
            if (!compra) return res.status(404).json({ mensaje: 'Compra no encontrada' });
            await prisma.compraInsumo.update({ where: { id }, data: { estado: 'anulada' } });
            await prisma.inventarioSucursal.update({
                where: { sucursalId_productoId: { sucursalId: compra.sucursalId, productoId: compra.productoId } },
                data: { stock: { decrement: compra.cantidad } }
            });
            await prisma.movimientoInventario.create({
                data: { productoId: compra.productoId, sucursalId: compra.sucursalId, tipo: 'salida', cantidad: compra.cantidad, motivo: 'Anulación de compra', referencia: compra.codigo }
            });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al anular la compra' });
        }
    },

    eliminarCompra: async (req, res) => {
        const id = Number(req.params.id);
        try {
            await prisma.compraInsumo.delete({ where: { id } });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la compra' });
        }
    }
};

module.exports = CompraInsumoController;