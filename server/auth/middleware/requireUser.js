const prisma = require('../../models/prisma');
const { verificarToken } = require('../utils/token');

// Resuelve una cuenta activa desde el token firmado. El id nunca se recibe del cliente.
const requireUser = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }
        const usuarioId = verificarToken(header.slice(7));
        if (!usuarioId) return res.status(401).json({ mensaje: 'No autorizado' });

        const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });
        if (!usuario || usuario.activo === false) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }
        req.usuario = usuario;
        return next();
    } catch (error) {
        console.error('[AUTH] requireUser:', error.message);
        return res.status(500).json({ error: 'Error de autorización' });
    }
};

module.exports = { requireUser };
