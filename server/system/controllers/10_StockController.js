const prisma = require('../../models/prisma');

const TIPOS = ['entrada', 'salida', 'merma', 'ajuste'];

const deltaDeTipo = (tipo, cantidad) => {
  if (tipo === 'entrada') return cantidad;
  if (tipo === 'salida' || tipo === 'merma') return -cantidad;
  if (tipo === 'ajuste') return cantidad; // firmada: positiva agrega, negativa resta
  return 0;
};

const StockController = {
    getSucursales: async (req, res) => {
        try {
            const sucursales = await prisma.sucursal.findMany({ orderBy: { nombre: 'asc' } });
            res.json({ success: true, sucursales });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener sucursales' });
        }
    },

    getResumen: async (req, res) => {
        try {
            const filas = await prisma.inventarioSucursal.findMany({
                include: { producto: { include: { categoria: true } }, sucursal: true },
                orderBy: { productoId: 'asc' }
            });
            const resumen = filas.map(f => ({
                id: f.id,
                productoId: f.productoId,
                productoNombre: f.producto.nombre,
                enlace: f.producto.enlace,
                imagen: f.producto.imagen,
                precio: f.producto.precio,
                categoria: f.producto.categoria?.titulo || '—',
                sucursalId: f.sucursalId,
                sucursalNombre: f.sucursal.nombre,
                stock: f.stock,
                minimo: f.minimo,
                estado: f.stock <= 0 ? 'agotado' : f.stock <= f.minimo ? 'critico' : 'ok'
            }));
            res.json({ success: true, resumen });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el resumen de stock' });
        }
    },

    getMovimientos: async (req, res) => {
        try {
            const movimientos = await prisma.movimientoInventario.findMany({
                include: { producto: true, sucursal: true },
                orderBy: { creadoEn: 'desc' }
            });
            res.json({ success: true, movimientos });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener movimientos' });
        }
    },

    crearMovimiento: async (req, res) => {
        const { productoId, sucursalId, tipo, cantidad, motivo, referencia } = req.body;
        try {
            if (!productoId || !sucursalId || !tipo || !cantidad) {
                return res.status(400).json({ mensaje: 'Producto, sucursal, tipo y cantidad son obligatorios' });
            }
            if (!TIPOS.includes(tipo)) {
                return res.status(400).json({ mensaje: 'Tipo de movimiento inválido' });
            }
            const producto = await prisma.producto.findUnique({ where: { id: parseInt(productoId) } });
            if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

            const delta = deltaDeTipo(tipo, parseInt(cantidad));
            const inv = await prisma.inventarioSucursal.upsert({
                where: { sucursalId_productoId: { sucursalId: parseInt(sucursalId), productoId: parseInt(productoId) } },
                create: { sucursalId: parseInt(sucursalId), productoId: parseInt(productoId), stock: Math.max(0, delta), minimo: 5 },
                update: { stock: { increment: delta } }
            });
            const stockFinal = Math.max(0, inv.stock);

            const movimiento = await prisma.movimientoInventario.create({
                data: {
                    productoId: parseInt(productoId),
                    sucursalId: parseInt(sucursalId),
                    tipo,
                    cantidad: Math.abs(delta),
                    motivo: motivo || null,
                    referencia: referencia || null
                }
            });
            res.status(201).json({ success: true, movimiento, stock: stockFinal });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar movimiento' });
        }
    },

    crearTransferencia: async (req, res) => {
        const { productoId, origenSucursalId, destinoSucursalId, cantidad } = req.body;
        try {
            if (!productoId || !origenSucursalId || !destinoSucursalId || !cantidad) {
                return res.status(400).json({ mensaje: 'Producto, origen, destino y cantidad son obligatorios' });
            }
            if (String(origenSucursalId) === String(destinoSucursalId)) {
                return res.status(400).json({ mensaje: 'El origen y el destino deben ser distintos' });
            }
            const origen = await prisma.inventarioSucursal.findUnique({
                where: { sucursalId_productoId: { sucursalId: parseInt(origenSucursalId), productoId: parseInt(productoId) } }
            });
            if (!origen || origen.stock < parseInt(cantidad)) {
                return res.status(400).json({ mensaje: 'No hay stock suficiente en la sucursal de origen' });
            }

            await prisma.inventarioSucursal.update({
                where: { sucursalId_productoId: { sucursalId: parseInt(origenSucursalId), productoId: parseInt(productoId) } },
                data: { stock: { decrement: parseInt(cantidad) } }
            });
            await prisma.inventarioSucursal.upsert({
                where: { sucursalId_productoId: { sucursalId: parseInt(destinoSucursalId), productoId: parseInt(productoId) } },
                create: { sucursalId: parseInt(destinoSucursalId), productoId: parseInt(productoId), stock: parseInt(cantidad), minimo: 5 },
                update: { stock: { increment: parseInt(cantidad) } }
            });
            const ref = `TRA-${Date.now().toString().slice(-6)}`;
            await prisma.movimientoInventario.createMany({
                data: [
                    { productoId: parseInt(productoId), sucursalId: parseInt(origenSucursalId), tipo: 'transferencia_salida', cantidad: parseInt(cantidad), motivo: 'Transferencia entre sucursales', referencia: ref },
                    { productoId: parseInt(productoId), sucursalId: parseInt(destinoSucursalId), tipo: 'transferencia_entrada', cantidad: parseInt(cantidad), motivo: 'Transferencia entre sucursales', referencia: ref }
                ]
            });
            res.status(201).json({ success: true, referencia: ref });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al transferir stock' });
        }
    },

    setMinimo: async (req, res) => {
        const { sucursalId, productoId, minimo } = req.body;
        try {
            if (!sucursalId || !productoId || minimo === undefined) {
                return res.status(400).json({ mensaje: 'Sucursal, producto y mínimo son obligatorios' });
            }
            const inv = await prisma.inventarioSucursal.upsert({
                where: { sucursalId_productoId: { sucursalId: parseInt(sucursalId), productoId: parseInt(productoId) } },
                create: { sucursalId: parseInt(sucursalId), productoId: parseInt(productoId), stock: 0, minimo: parseInt(minimo) },
                update: { minimo: parseInt(minimo) }
            });
            res.json({ success: true, minimo: inv.minimo });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el mínimo' });
        }
    },

    getAlertas: async (req, res) => {
        try {
            const filas = await prisma.inventarioSucursal.findMany({
                where: { stock: { lte: prisma.inventarioSucursal.fields.minimo } },
                include: { producto: { include: { categoria: true } }, sucursal: true }
            });
            res.json({ success: true, alertas: filas.map(f => ({
                productoId: f.productoId,
                productoNombre: f.producto.nombre,
                imagen: f.producto.imagen,
                categoria: f.producto.categoria?.titulo || '—',
                sucursalNombre: f.sucursal.nombre,
                stock: f.stock,
                minimo: f.minimo
            })) });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener alertas' });
        }
    },

    eliminarMovimiento: async (req, res) => {
        const id = Number(req.params.id);
        try {
            const mov = await prisma.movimientoInventario.findUnique({ where: { id } });
            if (!mov) return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
            const delta = deltaDeTipo(mov.tipo, mov.cantidad);
            await prisma.inventarioSucursal.update({
                where: { sucursalId_productoId: { sucursalId: mov.sucursalId, productoId: mov.productoId } },
                data: { stock: { increment: -delta } }
            });
            await prisma.movimientoInventario.delete({ where: { id } });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar movimiento' });
        }
    }
};

module.exports = StockController;