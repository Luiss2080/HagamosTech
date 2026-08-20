const express = require('express');
const router = express.Router();
const prisma = require('../../models/prisma');

// POST /api/contacto - Enviar mensaje de contacto
router.post('/', async (req, res) => {
    try {
        const { nombre, correo, telefono, asunto, mensaje, tipo } = req.body;

        if (!nombre || !correo || !mensaje) {
            return res.status(400).json({ error: 'Nombre, correo y mensaje son requeridos' });
        }

        const nuevoMensaje = await prisma.mensaje.create({
            data: {
                nombre,
                correo,
                telefono: telefono || '',
                asunto: asunto || '',
                mensaje,
                tipo: tipo || 'contacto',
                estado: 'nuevo'
            }
        });

        res.status(201).json({ mensaje: nuevoMensaje, message: 'Mensaje enviado exitosamente' });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ error: 'Error al enviar mensaje' });
    }
});

// GET /api/contacto - Listar mensajes (solo admin)
router.get('/', async (req, res) => {
    try {
        const mensajes = await prisma.mensaje.findMany({
            orderBy: { fechaCreacion: 'desc' }
        });
        res.json(mensajes);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
});

// PUT /api/contacto/:id/estado - Actualizar estado del mensaje
router.put('/:id/estado', async (req, res) => {
    try {
        const { estado } = req.body;
        const mensaje = await prisma.mensaje.update({
            where: { id: parseInt(req.params.id) },
            data: { estado }
        });
        res.json({ mensaje, message: 'Estado actualizado' });
    } catch (error) {
        console.error('Error al actualizar mensaje:', error);
        res.status(500).json({ error: 'Error al actualizar mensaje' });
    }
});

module.exports = router;
