const prisma = require('../../models/prisma');

const UsuarioController = {
    obtenerUsuarios: async (req, res) => {
        try {
            const usuarios = await prisma.usuario.findMany({
                include: { rol: true },
                orderBy: { nombre: 'asc' }
            });
            res.json({
                success: true,
                usuarios: usuarios.map(u => ({
                    id: u.id,
                    usuario: u.usuario,
                    correo: u.correo,
                    nombre: u.nombre,
                    apellido: u.apellido,
                    numci: u.numci,
                    fenac: u.fenac,
                    numtel: u.numtel,
                    nomcol: u.nomcol,
                    activo: u.activo,
                    rolId: u.rolId,
                    rolNombre: u.rol?.nombre || 'Invitado'
                }))
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    },

    crearUsuario: async (req, res) => {
        const { nombre, apellido, numci, fenac, numtel, nomcol, correo, contrasena, rolId, usuario } = req.body;
        try {
            const existeCorreo = await prisma.usuario.findFirst({ where: { correo } });
            if (existeCorreo) {
                return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
            }

            const nuevo = await prisma.usuario.create({
                data: {
                    correo,
                    contrasena,
                    nombre,
                    apellido,
                    numci,
                    fenac: fenac ? new Date(fenac) : null,
                    numtel,
                    nomcol,
                    usuario,
                    rolId: parseInt(rolId)
                }
            });

            res.status(201).json({ success: true, usuario: nuevo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    },

    editarUsuario: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, numci, fenac, numtel, nomcol, correo, contrasena, rolId, usuario } = req.body;
        try {
            const dataToUpdate = {
                correo,
                nombre,
                apellido,
                numci,
                fenac: fenac ? new Date(fenac) : null,
                numtel,
                nomcol,
                usuario,
                rolId: parseInt(rolId)
            };
            if (contrasena && contrasena.trim() !== '') {
                dataToUpdate.contrasena = contrasena;
            }
            const usuarioModificado = await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: dataToUpdate
            });
            res.json({ success: true, usuario: usuarioModificado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    },

    cambiarEstadoUsuario: async (req, res) => {
        const { id } = req.params;
        const { activo } = req.body;
        try {
            await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: { activo }
            });
            res.json({ success: true, mensaje: `Usuario ${activo ? 'activado' : 'desactivado'} exitosamente` });
        } catch (error) {
            res.status(500).json({ error: 'Error al cambiar estado del usuario' });
        }
    },

    obtenerInvitados: async (req, res) => {
        try {
            const invitados = await prisma.usuario.findMany({
                where: { rolId: 4 },
                orderBy: { nombre: 'asc' }
            });
            res.json({ success: true, invitados });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener invitados' });
        }
  }
};

module.exports = UsuarioController;
