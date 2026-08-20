const prisma = require('../../models/prisma');

const SucursalController = {
    obtenerSucursales: async (req, res) => {
        try {
            const sucursales = await prisma.sucursal.findMany({ orderBy: [{ ciudad: 'asc' }, { nombre: 'asc' }] });
            res.json({ success: true, sucursales });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener sucursales' });
        }
    },

    obtenerSucursal: async (req, res) => {
        try {
            const sucursal = await prisma.sucursal.findUnique({ where: { id: Number(req.params.id) } });
            if (!sucursal) return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
            res.json({ success: true, sucursal });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la sucursal' });
        }
    },

    crearSucursal: async (req, res) => {
        const { nombre, ciudad, direccion, telefono, horario, servicios, activo } = req.body;
        try {
            if (!nombre || !ciudad) return res.status(400).json({ mensaje: 'Nombre y ciudad son obligatorios' });
            const sucursal = await prisma.sucursal.create({
                data: {
                    nombre,
                    ciudad,
                    direccion: direccion || null,
                    telefono: telefono || null,
                    horario: horario || null,
                    servicios: servicios || null,
                    activo: activo !== undefined ? !!activo : true
                }
            });
            res.status(201).json({ success: true, sucursal });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar la sucursal' });
        }
    },

    editarSucursal: async (req, res) => {
        const id = Number(req.params.id);
        const { nombre, ciudad, direccion, telefono, horario, servicios, activo } = req.body;
        try {
            if (!nombre || !ciudad) return res.status(400).json({ mensaje: 'Nombre y ciudad son obligatorios' });
            const sucursal = await prisma.sucursal.update({
                where: { id },
                data: {
                    nombre,
                    ciudad,
                    direccion: direccion || null,
                    telefono: telefono || null,
                    horario: horario || null,
                    servicios: servicios || null,
                    activo: activo !== undefined ? !!activo : true
                }
            });
            res.json({ success: true, sucursal });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la sucursal' });
        }
    },

    eliminarSucursal: async (req, res) => {
        const id = Number(req.params.id);
        try {
            const inv = await prisma.inventarioSucursal.count({ where: { sucursalId: id } });
            const compras = await prisma.compraInsumo.count({ where: { sucursalId: id } });
            if (inv > 0 || compras > 0) {
                await prisma.sucursal.update({ where: { id }, data: { activo: false } });
                return res.json({ success: true, desactivada: true, mensaje: 'La sucursal tiene movimientos asociados; se desactivó en lugar de eliminar.' });
            }
            await prisma.sucursal.delete({ where: { id } });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la sucursal' });
        }
    }
};

module.exports = SucursalController;