const express = require('express');
const prisma = require('../../models/prisma');
const { requireUser } = require('../../auth/middleware/requireUser');

const router = express.Router();
const COLORES = new Set(['#A3E635', '#ef4444', '#d4a72c', '#1d4ed8', '#10b981']);
const PRIVACIDADES = new Set(['public', 'members', 'private']);
const POR_DEFECTO = {
    colorAcento: '#A3E635',
    privacidadPerfil: 'members',
    email_promociones: true,
    email_pedidos: true,
    sms_alertas: false,
};
const CAMPOS_BOOLEANOS = ['email_promociones', 'email_pedidos', 'sms_alertas'];

const serializar = (preferencias) => ({
    colorAcento: preferencias.colorAcento,
    privacidadPerfil: preferencias.privacidadPerfil,
    email_promociones: preferencias.emailPromociones,
    email_pedidos: preferencias.emailPedidos,
    sms_alertas: preferencias.smsAlertas,
});

router.use(requireUser);

router.get('/', async (req, res) => {
    try {
        const preferencias = await prisma.preferenciaPerfil.findUnique({ where: { usuarioId: req.usuario.id } });
        return res.json({ data: preferencias ? serializar(preferencias) : POR_DEFECTO });
    } catch (error) {
        console.error('[PERFIL] leer preferencias:', error.message);
        return res.status(500).json({ error: 'No se pudieron cargar las preferencias' });
    }
});

router.put('/', async (req, res) => {
    const body = req.body || {};
    if (body.colorAcento !== undefined && !COLORES.has(body.colorAcento)) {
        return res.status(400).json({ error: 'El color de acento seleccionado no es válido' });
    }
    if (body.privacidadPerfil !== undefined && !PRIVACIDADES.has(body.privacidadPerfil)) {
        return res.status(400).json({ error: 'El nivel de privacidad seleccionado no es válido' });
    }
    if (CAMPOS_BOOLEANOS.some((campo) => body[campo] !== undefined && typeof body[campo] !== 'boolean')) {
        return res.status(400).json({ error: 'Las preferencias de notificación deben ser verdaderas o falsas' });
    }

    try {
        const existente = await prisma.preferenciaPerfil.findUnique({ where: { usuarioId: req.usuario.id } });
        const preferencias = {
            colorAcento: body.colorAcento ?? existente?.colorAcento ?? POR_DEFECTO.colorAcento,
            privacidadPerfil: body.privacidadPerfil ?? existente?.privacidadPerfil ?? POR_DEFECTO.privacidadPerfil,
            emailPromociones: body.email_promociones ?? existente?.emailPromociones ?? POR_DEFECTO.email_promociones,
            emailPedidos: body.email_pedidos ?? existente?.emailPedidos ?? POR_DEFECTO.email_pedidos,
            smsAlertas: body.sms_alertas ?? existente?.smsAlertas ?? POR_DEFECTO.sms_alertas,
        };
        const guardadas = await prisma.preferenciaPerfil.upsert({
            where: { usuarioId: req.usuario.id },
            create: { usuarioId: req.usuario.id, ...preferencias },
            update: preferencias,
        });
        return res.json({ data: serializar(guardadas) });
    } catch (error) {
        console.error('[PERFIL] guardar preferencias:', error.message);
        return res.status(500).json({ error: 'No se pudieron guardar las preferencias' });
    }
});

module.exports = router;
