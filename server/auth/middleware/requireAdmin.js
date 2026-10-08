const prisma = require('../../models/prisma');
const { verificarToken } = require('../utils/token');

// Rol Administrador (id 1 en el seed) o permiso `admin_total`.
const ROL_ADMIN = 1;
const PERMISO_ADMIN = 'admin_total';

// Exige sesión (Bearer firmado) y rol de administrador. 401 sin sesión válida, 403 sin rol.
const requireAdmin = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }
        const userId = verificarToken(header.split(' ')[1]);
        if (!userId) return res.status(401).json({ mensaje: 'No autorizado' });

        const usuario = await prisma.usuario.findUnique({
            where: { id: userId },
            include: { rol: { include: { detalleRolPermisos: { include: { permiso: true } } } } }
        });
        if (!usuario || usuario.activo === false) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }

        const permisos = usuario.rol?.detalleRolPermisos?.map((d) => d.permiso.nombre) || [];
        if (usuario.rolId !== ROL_ADMIN && !permisos.includes(PERMISO_ADMIN)) {
            return res.status(403).json({ mensaje: 'Acceso restringido a administradores' });
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.error('[AUTH] requireAdmin:', error.message);
        res.status(500).json({ error: 'Error de autorización' });
    }
};

module.exports = { requireAdmin };
