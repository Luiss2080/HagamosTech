const prisma = require('../../models/prisma');

const RolController = {
    obtenerRoles: async (req, res) => {
        try {
            const roles = await prisma.rol.findMany({
                include: {
                    detalleRolPermisos: true
                },
                orderBy: { id: 'asc' }
            });
            res.json({ success: true, roles });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener roles' });
        }
    },

    crearRol: async (req, res) => {
        const { nombre, permisoIds } = req.body;
        try {
            const existe = await prisma.rol.findFirst({ where: { nombre } });
            if (existe) {
                return res.status(400).json({ mensaje: 'El nombre del rol ya existe' });
            }
            const rol = await prisma.$transaction(async (tx) => {
                const nuevo = await tx.rol.create({ data: { nombre } });
                if (permisoIds && permisoIds.length > 0) {
                    const dataInsert = permisoIds.map(pId => ({
                        fkIdR: nuevo.id,
                        fkIdP: parseInt(pId)
                    }));
                    await tx.detalleRolPermisos.createMany({ data: dataInsert });
                }
                return nuevo;
            });
            res.status(201).json({ success: true, rol });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar rol' });
        }
    },

    obtenerMatrizPermisos: async (req, res) => {
        try {
            const roles = await prisma.rol.findMany({
                include: {
                    detalleRolPermisos: {
                        include: { permiso: true }
                    }
                },
                orderBy: { id: 'asc' }
            });

            const permisos = await prisma.permiso.findMany({ orderBy: { id: 'asc' } });

            res.json({ success: true, roles, permisos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener matriz de permisos' });
        }
    },

    actualizarPermisosRol: async (req, res) => {
        const { rolId, permisoIds } = req.body;
        try {
            const rId = parseInt(rolId);
            
            await prisma.$transaction(async (tx) => {
                // Eliminar relaciones de este rol
                await tx.detalleRolPermisos.deleteMany({
                    where: { fkIdR: rId }
                });

                // Insertar las nuevas relaciones
                if (permisoIds && permisoIds.length > 0) {
                    const dataInsert = permisoIds.map(pId => ({
                        fkIdR: rId,
                        fkIdP: parseInt(pId)
                    }));
                    await tx.detalleRolPermisos.createMany({
                        data: dataInsert
                    });
                }
            });

            res.json({ success: true, mensaje: 'Permisos de rol actualizados exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar permisos de rol' });
        }
    },

    editarRol: async (req, res) => {
        const { id } = req.params;
        const { nombre, permisoIds } = req.body;
        try {
            const existe = await prisma.rol.findFirst({ where: { nombre } });
            if (existe && existe.id !== parseInt(id)) {
                return res.status(400).json({ mensaje: 'El nombre del rol ya existe' });
            }
            const rol = await prisma.$transaction(async (tx) => {
                const actualizado = await tx.rol.update({
                    where: { id: parseInt(id) },
                    data: { nombre }
                });

                await tx.detalleRolPermisos.deleteMany({
                    where: { fkIdR: parseInt(id) }
                });

                if (permisoIds && permisoIds.length > 0) {
                    const dataInsert = permisoIds.map(pId => ({
                        fkIdR: parseInt(id),
                        fkIdP: parseInt(pId)
                    }));
                    await tx.detalleRolPermisos.createMany({ data: dataInsert });
                }
                return actualizado;
            });
            res.json({ success: true, rol });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar rol' });
        }
    },

    eliminarRol: async (req, res) => {
        const { id } = req.params;
        try {
            const rId = parseInt(id);
            const tieneUsuarios = await prisma.usuario.count({
                where: { rolId: rId }
            });
            if (tieneUsuarios > 0) {
                return res.status(400).json({ mensaje: 'No se puede eliminar el rol porque está asignado a uno o más usuarios' });
            }
            await prisma.detalleRolPermisos.deleteMany({
                where: { fkIdR: rId }
            });
            await prisma.rol.delete({
                where: { id: rId }
            });
            res.json({ success: true, mensaje: 'Rol eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar rol' });
        }
    }
};

module.exports = RolController;
