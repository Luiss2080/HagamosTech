const prisma = require('../../models/prisma');

const CuponController = {
    reclamarCupon: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ mensaje: 'No autorizado' });
            }
            const token = authHeader.split(' ')[1];
            const parts = token.split('-');
            const userId = parseInt(parts[2]);
            if (isNaN(userId)) {
                return res.status(401).json({ mensaje: 'Token inválido' });
            }

            const cupon = await prisma.cuponDescuento.findUnique({ where: { usuarioId: userId } });
            
            if (!cupon) {
                return res.status(404).json({ mensaje: 'No tienes un cupón asignado.' });
            }

            if (cupon.estado === 'reclamado' || cupon.estado === 'usado') {
                return res.status(400).json({ mensaje: 'El cupón ya fue reclamado o usado.' });
            }

            const fechaExpiracionActiva = cupon.fechaExpiracionExtendida || cupon.fechaExpiracion;
            if (new Date() > fechaExpiracionActiva) {
                return res.status(400).json({ mensaje: 'El tiempo para reclamar el cupón ha expirado.' });
            }

            // Generar código
            const codigoString = 'BIENVENIDA' + userId + Date.now().toString().slice(-4);

            const cuponActualizado = await prisma.cuponDescuento.update({
                where: { id: cupon.id },
                data: {
                    estado: 'reclamado',
                    codigo: codigoString
                }
            });

            res.json({ success: true, cupon: cuponActualizado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al reclamar el cupón' });
        }
    },

    extenderCupon: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ mensaje: 'No autorizado' });
            }
            const token = authHeader.split(' ')[1];
            const parts = token.split('-');
            const userId = parseInt(parts[2]);
            if (isNaN(userId)) {
                return res.status(401).json({ mensaje: 'Token inválido' });
            }

            const cupon = await prisma.cuponDescuento.findUnique({ where: { usuarioId: userId } });
            
            if (!cupon) {
                return res.status(404).json({ mensaje: 'No tienes un cupón asignado.' });
            }

            if (cupon.extendido) {
                return res.status(400).json({ mensaje: 'El cupón ya fue extendido previamente.' });
            }

            if (cupon.estado !== 'pendiente') {
                return res.status(400).json({ mensaje: 'No se puede extender un cupón que ya ha sido reclamado o usado.' });
            }

            const nuevaExpiracion = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // +72 horas

            const cuponActualizado = await prisma.cuponDescuento.update({
                where: { id: cupon.id },
                data: {
                    extendido: true,
                    fechaExpiracionExtendida: nuevaExpiracion
                }
            });

            res.json({ success: true, cupon: cuponActualizado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al extender el tiempo del cupón' });
        }
    }
};

module.exports = CuponController;
