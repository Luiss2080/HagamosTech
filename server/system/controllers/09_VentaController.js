const prisma = require('../../models/prisma');

const generarCodigo = () => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const yyyy = hoy.getFullYear();
    const n = Math.floor(1000 + Math.random() * 9000);
    return `V-${yyyy}${mm}${dd}-${n}`;
};

const VentaController = {
    obtenerVentas: async (req, res) => {
        try {
            const ventas = await prisma.venta.findMany({ orderBy: { creadoEn: 'desc' } });
            res.json({ success: true, ventas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener ventas' });
        }
    },

    obtenerVenta: async (req, res) => {
        try {
            const venta = await prisma.venta.findUnique({ where: { id: Number(req.params.id) } });
            if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada' });
            res.json({ success: true, venta });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la venta' });
        }
    },

    crearVenta: async (req, res) => {
        const { codigo, mesa, clienteNombre, telefono, items, total, metodoPago, observaciones, origen } = req.body;
        try {
            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ mensaje: 'Debe incluir al menos un ítem' });
            }
            if (total === undefined || total === '') {
                return res.status(400).json({ mensaje: 'El total es obligatorio' });
            }
            let cod = codigo || generarCodigo();
            if (codigo) {
                const existe = await prisma.venta.findUnique({ where: { codigo: cod } });
                if (existe) return res.status(400).json({ mensaje: 'El código de venta ya existe' });
            }
            const venta = await prisma.venta.create({
                data: {
                    codigo: cod,
                    mesa: mesa || null,
                    clienteNombre: clienteNombre || null,
                    telefono: telefono || null,
                    items,
                    total: parseFloat(total),
                    metodoPago: metodoPago || 'efectivo',
                    observaciones: observaciones || null,
                    origen: origen || 'sistema',
                    pagadoEn: new Date()
                }
            });
            res.status(201).json({ success: true, venta });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar venta' });
        }
    },

    anularVenta: async (req, res) => {
        try {
            const venta = await prisma.venta.update({
                where: { id: Number(req.params.id) },
                data: { estado: 'anulada', anuladoEn: new Date() }
            });
            res.json({ success: true, venta });
        } catch (error) {
            res.status(500).json({ error: 'Error al anular la venta' });
        }
    },

    eliminarVenta: async (req, res) => {
        try {
            await prisma.venta.delete({ where: { id: Number(req.params.id) } });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la venta' });
        }
    }
};

module.exports = VentaController;