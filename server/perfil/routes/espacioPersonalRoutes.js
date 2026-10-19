const express = require('express');
const prisma = require('../../models/prisma');
const { requireUser } = require('../../auth/middleware/requireUser');

const router = express.Router();
const ETAPAS = new Set(['idea', 'consulta', 'progreso', 'revision', 'finalizado']);
const idValido = (value) => /^\d+$/.test(String(value)) && Number(value) > 0;
const texto = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max;
const fecha = (value) => typeof value === 'string' && !Number.isNaN(Date.parse(value));
const numeroProyecto = (value) => value === null || value === '' || value === undefined ? null : Number(value);

router.use(requireUser);

const proyectoDeUsuario = async (proyectoId, usuarioId) => {
    if (proyectoId === null) return true;
    if (!idValido(proyectoId)) return false;
    return Boolean(await prisma.proyectoPersonal.findFirst({ where: { id: Number(proyectoId), usuarioId }, select: { id: true } }));
};

router.get('/proyectos', async (req, res) => {
    try {
        const proyectos = await prisma.proyectoPersonal.findMany({
            where: { usuarioId: req.usuario.id },
            orderBy: { actualizadoEn: 'desc' },
            include: { _count: { select: { notas: true, eventos: true } } },
        });
        return res.json({ data: proyectos });
    } catch (error) {
        console.error('[ESPACIO] listar proyectos:', error.message);
        return res.status(500).json({ error: 'No se pudieron cargar los proyectos' });
    }
});

router.post('/proyectos', async (req, res) => {
    const { titulo, categoria, descripcion, etapa } = req.body || {};
    if (!texto(titulo, 120) || (categoria !== undefined && !texto(categoria, 60)) ||
        (descripcion !== undefined && descripcion !== null && (typeof descripcion !== 'string' || descripcion.length > 4000)) ||
        (etapa !== undefined && !ETAPAS.has(etapa))) {
        return res.status(400).json({ error: 'Revisa el título, categoría, descripción y etapa del proyecto' });
    }
    try {
        const proyecto = await prisma.proyectoPersonal.create({ data: {
            usuarioId: req.usuario.id,
            titulo: titulo.trim(),
            categoria: categoria?.trim() || 'Personal',
            descripcion: descripcion?.trim() || null,
            etapa: etapa || 'idea',
        } });
        return res.status(201).json({ data: proyecto });
    } catch (error) {
        console.error('[ESPACIO] crear proyecto:', error.message);
        return res.status(500).json({ error: 'No se pudo guardar el proyecto' });
    }
});

router.put('/proyectos/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'Identificador inválido' });
    const { titulo, categoria, descripcion, etapa } = req.body || {};
    if ((titulo !== undefined && !texto(titulo, 120)) || (categoria !== undefined && !texto(categoria, 60)) ||
        (descripcion !== undefined && descripcion !== null && (typeof descripcion !== 'string' || descripcion.length > 4000)) ||
        (etapa !== undefined && !ETAPAS.has(etapa))) {
        return res.status(400).json({ error: 'Revisa el título, categoría, descripción y etapa del proyecto' });
    }
    try {
        const id = Number(req.params.id);
        const existente = await prisma.proyectoPersonal.findFirst({ where: { id, usuarioId: req.usuario.id }, select: { id: true } });
        if (!existente) return res.status(404).json({ error: 'Proyecto no encontrado' });
        const data = {};
        if (titulo !== undefined) data.titulo = titulo.trim();
        if (categoria !== undefined) data.categoria = categoria.trim();
        if (descripcion !== undefined) data.descripcion = descripcion?.trim() || null;
        if (etapa !== undefined) data.etapa = etapa;
        const proyecto = await prisma.proyectoPersonal.update({ where: { id }, data });
        return res.json({ data: proyecto });
    } catch (error) {
        console.error('[ESPACIO] actualizar proyecto:', error.message);
        return res.status(500).json({ error: 'No se pudo actualizar el proyecto' });
    }
});

router.delete('/proyectos/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'Identificador inválido' });
    try {
        const id = Number(req.params.id);
        const existente = await prisma.proyectoPersonal.findFirst({ where: { id, usuarioId: req.usuario.id }, select: { id: true } });
        if (!existente) return res.status(404).json({ error: 'Proyecto no encontrado' });
        await prisma.proyectoPersonal.delete({ where: { id } });
        return res.status(204).end();
    } catch (error) {
        console.error('[ESPACIO] eliminar proyecto:', error.message);
        return res.status(500).json({ error: 'No se pudo eliminar el proyecto' });
    }
});

router.get('/notas', async (req, res) => {
    try {
        const notas = await prisma.notaPersonal.findMany({ where: { usuarioId: req.usuario.id }, orderBy: { actualizadoEn: 'desc' } });
        return res.json({ data: notas });
    } catch (error) {
        console.error('[ESPACIO] listar notas:', error.message);
        return res.status(500).json({ error: 'No se pudieron cargar las notas' });
    }
});

router.post('/notas', async (req, res) => {
    const { titulo, contenido } = req.body || {};
    const proyectoId = numeroProyecto(req.body?.proyectoId);
    if (!texto(titulo, 120) || !texto(contenido, 10000) || (proyectoId !== null && !idValido(proyectoId))) {
        return res.status(400).json({ error: 'La nota necesita título y contenido válidos' });
    }
    try {
        if (!(await proyectoDeUsuario(proyectoId, req.usuario.id))) return res.status(404).json({ error: 'Proyecto no encontrado' });
        const nota = await prisma.notaPersonal.create({ data: { usuarioId: req.usuario.id, proyectoId, titulo: titulo.trim(), contenido: contenido.trim() } });
        return res.status(201).json({ data: nota });
    } catch (error) {
        console.error('[ESPACIO] crear nota:', error.message);
        return res.status(500).json({ error: 'No se pudo guardar la nota' });
    }
});

router.put('/notas/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'Identificador inválido' });
    const { titulo, contenido } = req.body || {};
    const tieneProyecto = Object.hasOwn(req.body || {}, 'proyectoId');
    const proyectoId = tieneProyecto ? numeroProyecto(req.body.proyectoId) : undefined;
    if ((titulo !== undefined && !texto(titulo, 120)) || (contenido !== undefined && !texto(contenido, 10000)) ||
        (tieneProyecto && proyectoId !== null && !idValido(proyectoId))) return res.status(400).json({ error: 'Datos de nota inválidos' });
    try {
        const id = Number(req.params.id);
        const existente = await prisma.notaPersonal.findFirst({ where: { id, usuarioId: req.usuario.id }, select: { id: true } });
        if (!existente) return res.status(404).json({ error: 'Nota no encontrada' });
        if (tieneProyecto && !(await proyectoDeUsuario(proyectoId, req.usuario.id))) return res.status(404).json({ error: 'Proyecto no encontrado' });
        const data = {};
        if (titulo !== undefined) data.titulo = titulo.trim();
        if (contenido !== undefined) data.contenido = contenido.trim();
        if (tieneProyecto) data.proyectoId = proyectoId;
        const nota = await prisma.notaPersonal.update({ where: { id }, data });
        return res.json({ data: nota });
    } catch (error) {
        console.error('[ESPACIO] actualizar nota:', error.message);
        return res.status(500).json({ error: 'No se pudo actualizar la nota' });
    }
});

router.delete('/notas/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'Identificador inválido' });
    try {
        const id = Number(req.params.id);
        const existente = await prisma.notaPersonal.findFirst({ where: { id, usuarioId: req.usuario.id }, select: { id: true } });
        if (!existente) return res.status(404).json({ error: 'Nota no encontrada' });
        await prisma.notaPersonal.delete({ where: { id } });
        return res.status(204).end();
    } catch (error) {
        console.error('[ESPACIO] eliminar nota:', error.message);
        return res.status(500).json({ error: 'No se pudo eliminar la nota' });
    }
});

router.get('/eventos', async (req, res) => {
    try {
        const eventos = await prisma.eventoPersonal.findMany({ where: { usuarioId: req.usuario.id }, orderBy: { inicio: 'asc' } });
        return res.json({ data: eventos });
    } catch (error) {
        console.error('[ESPACIO] listar eventos:', error.message);
        return res.status(500).json({ error: 'No se pudieron cargar los eventos' });
    }
});

router.post('/eventos', async (req, res) => {
    const { titulo, descripcion, inicio, fin } = req.body || {};
    const proyectoId = numeroProyecto(req.body?.proyectoId);
    if (!texto(titulo, 120) || !fecha(inicio) || (descripcion !== undefined && descripcion !== null && (typeof descripcion !== 'string' || descripcion.length > 500)) ||
        (fin !== undefined && fin !== null && !fecha(fin)) || (fin && new Date(fin) < new Date(inicio)) ||
        (proyectoId !== null && !idValido(proyectoId))) return res.status(400).json({ error: 'Revisa el título, fecha y proyecto del recordatorio' });
    try {
        if (!(await proyectoDeUsuario(proyectoId, req.usuario.id))) return res.status(404).json({ error: 'Proyecto no encontrado' });
        const evento = await prisma.eventoPersonal.create({ data: {
            usuarioId: req.usuario.id, proyectoId, titulo: titulo.trim(), descripcion: descripcion?.trim() || null,
            inicio: new Date(inicio), fin: fin ? new Date(fin) : null,
        } });
        return res.status(201).json({ data: evento });
    } catch (error) {
        console.error('[ESPACIO] crear evento:', error.message);
        return res.status(500).json({ error: 'No se pudo guardar el recordatorio' });
    }
});

router.put('/eventos/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'Identificador inválido' });
    const { titulo, descripcion, inicio, fin } = req.body || {};
    const tieneProyecto = Object.hasOwn(req.body || {}, 'proyectoId');
    const proyectoId = tieneProyecto ? numeroProyecto(req.body.proyectoId) : undefined;
    if ((titulo !== undefined && !texto(titulo, 120)) || (inicio !== undefined && !fecha(inicio)) ||
        (descripcion !== undefined && descripcion !== null && (typeof descripcion !== 'string' || descripcion.length > 500)) ||
        (fin !== undefined && fin !== null && !fecha(fin)) ||
        (inicio && fin && new Date(fin) < new Date(inicio)) ||
        (tieneProyecto && proyectoId !== null && !idValido(proyectoId))) return res.status(400).json({ error: 'Datos de recordatorio inválidos' });
    try {
        const id = Number(req.params.id);
        const existente = await prisma.eventoPersonal.findFirst({ where: { id, usuarioId: req.usuario.id }, select: { id: true } });
        if (!existente) return res.status(404).json({ error: 'Recordatorio no encontrado' });
        if (tieneProyecto && !(await proyectoDeUsuario(proyectoId, req.usuario.id))) return res.status(404).json({ error: 'Proyecto no encontrado' });
        const data = {};
        if (titulo !== undefined) data.titulo = titulo.trim();
        if (descripcion !== undefined) data.descripcion = descripcion?.trim() || null;
        if (inicio !== undefined) data.inicio = new Date(inicio);
        if (fin !== undefined) data.fin = fin ? new Date(fin) : null;
        if (tieneProyecto) data.proyectoId = proyectoId;
        const evento = await prisma.eventoPersonal.update({ where: { id }, data });
        return res.json({ data: evento });
    } catch (error) {
        console.error('[ESPACIO] actualizar evento:', error.message);
        return res.status(500).json({ error: 'No se pudo actualizar el recordatorio' });
    }
});

router.delete('/eventos/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'Identificador inválido' });
    try {
        const id = Number(req.params.id);
        const existente = await prisma.eventoPersonal.findFirst({ where: { id, usuarioId: req.usuario.id }, select: { id: true } });
        if (!existente) return res.status(404).json({ error: 'Recordatorio no encontrado' });
        await prisma.eventoPersonal.delete({ where: { id } });
        return res.status(204).end();
    } catch (error) {
        console.error('[ESPACIO] eliminar evento:', error.message);
        return res.status(500).json({ error: 'No se pudo eliminar el recordatorio' });
    }
});

module.exports = router;
