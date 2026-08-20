const prisma = require('../../models/prisma');

const PermisoController = {
    obtenerPermisos: async (req, res) => {
        try {
            const permisos = await prisma.permiso.findMany({ orderBy: { nombre: 'asc' } });
            res.json({ success: true, permisos });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener permisos' });
        }
    },

    crearPermiso: async (req, res) => {
        const { nombre } = req.body;
        try {
            const existe = await prisma.permiso.findFirst({ where: { nombre } });
            if (existe) {
                return res.status(400).json({ mensaje: 'El nombre del permiso ya existe' });
            }
            const permiso = await prisma.permiso.create({ data: { nombre } });
            res.status(201).json({ success: true, permiso });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar permiso' });
        }
    },

    editarPermiso: async (req, res) => {
        const { id } = req.params;
        const { nombre } = req.body;
        try {
            const existe = await prisma.permiso.findFirst({
                where: {
                    nombre,
                    NOT: { id: Number(id) }
                }
            });
            if (existe) {
                return res.status(400).json({ mensaje: 'El nombre del permiso ya existe' });
            }
            const permiso = await prisma.permiso.update({
                where: { id: Number(id) },
                data: { nombre: nombre.toUpperCase() }
            });
            res.json({ success: true, permiso });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar permiso' });
        }
    },

    eliminarPermiso: async (req, res) => {
        const { id } = req.params;
        try {
            // Eliminar vinculaciones en la tabla relacional
            await prisma.detalleRolPermisos.deleteMany({
                where: { fkIdP: Number(id) }
            });
            // Eliminar permiso
            await prisma.permiso.delete({
                where: { id: Number(id) }
            });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar permiso' });
        }
    }
};

module.exports = PermisoController;
