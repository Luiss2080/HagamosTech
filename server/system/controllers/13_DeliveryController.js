const prisma = require('../../models/prisma');

const generarCodigo = () => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const yyyy = hoy.getFullYear();
    return `D-${yyyy}${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const totalItems = (items) => Array.isArray(items)
    ? items.reduce((a, i) => a + (i.precio || 0) * (i.cantidad || 1), 0)
    : 0;

const DeliveryController = {
    // ── Zonas ──
    getZonas: async (req, res) => {
        try {
            const zonas = await prisma.zonaDelivery.findMany({ orderBy: { tarifa: 'asc' } });
            res.json({ success: true, zonas });
        } catch (error) { res.status(500).json({ error: 'Error al obtener zonas' }); }
    },
    crearZona: async (req, res) => {
        const { nombre, tarifa, tiempo, descripcion, activo } = req.body;
        try {
            if (!nombre || tarifa === undefined) return res.status(400).json({ mensaje: 'Nombre y tarifa son obligatorios' });
            const zona = await prisma.zonaDelivery.create({ data: { nombre, tarifa: parseFloat(tarifa), tiempo: tiempo || null, descripcion: descripcion || null, activo: activo !== undefined ? !!activo : true } });
            res.status(201).json({ success: true, zona });
        } catch (error) { res.status(500).json({ error: 'Error al registrar zona' }); }
    },
    editarZona: async (req, res) => {
        const { nombre, tarifa, tiempo, descripcion, activo } = req.body;
        try {
            const zona = await prisma.zonaDelivery.update({ where: { id: Number(req.params.id) }, data: { nombre, tarifa: parseFloat(tarifa), tiempo: tiempo || null, descripcion: descripcion || null, activo: activo !== undefined ? !!activo : true } });
            res.json({ success: true, zona });
        } catch (error) { res.status(500).json({ error: 'Error al actualizar zona' }); }
    },
    eliminarZona: async (req, res) => {
        try {
            const usos = await prisma.pedidoDelivery.count({ where: { zonaId: Number(req.params.id) } });
            if (usos > 0) {
                await prisma.zonaDelivery.update({ where: { id: Number(req.params.id) }, data: { activo: false } });
                return res.json({ success: true, desactivada: true, mensaje: 'La zona tiene pedidos asociados; se desactivó.' });
            }
            await prisma.zonaDelivery.delete({ where: { id: Number(req.params.id) } });
            res.json({ success: true });
        } catch (error) { res.status(500).json({ error: 'Error al eliminar zona' }); }
    },

    // ── Repartidores ──
    getRepartidores: async (req, res) => {
        try {
            const repartidores = await prisma.repartidor.findMany({ orderBy: { nombre: 'asc' } });
            res.json({ success: true, repartidores });
        } catch (error) { res.status(500).json({ error: 'Error al obtener repartidores' }); }
    },
    crearRepartidor: async (req, res) => {
        const { nombre, telefono, vehiculo, disponible, activo } = req.body;
        try {
            if (!nombre) return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
            const repartidor = await prisma.repartidor.create({ data: { nombre, telefono: telefono || null, vehiculo: vehiculo || null, disponible: disponible !== undefined ? !!disponible : true, activo: activo !== undefined ? !!activo : true } });
            res.status(201).json({ success: true, repartidor });
        } catch (error) { res.status(500).json({ error: 'Error al registrar repartidor' }); }
    },
    editarRepartidor: async (req, res) => {
        const { nombre, telefono, vehiculo, disponible, activo } = req.body;
        try {
            const repartidor = await prisma.repartidor.update({ where: { id: Number(req.params.id) }, data: { nombre, telefono: telefono || null, vehiculo: vehiculo || null, disponible: disponible !== undefined ? !!disponible : true, activo: activo !== undefined ? !!activo : true } });
            res.json({ success: true, repartidor });
        } catch (error) { res.status(500).json({ error: 'Error al actualizar repartidor' }); }
    },
    eliminarRepartidor: async (req, res) => {
        try {
            const usos = await prisma.pedidoDelivery.count({ where: { repartidorId: Number(req.params.id) } });
            if (usos > 0) {
                await prisma.repartidor.update({ where: { id: Number(req.params.id) }, data: { activo: false } });
                return res.json({ success: true, desactivada: true, mensaje: 'El repartidor tiene pedidos asociados; se desactivó.' });
            }
            await prisma.repartidor.delete({ where: { id: Number(req.params.id) } });
            res.json({ success: true });
        } catch (error) { res.status(500).json({ error: 'Error al eliminar repartidor' }); }
    },

    // ── Pedidos ──
    getPedidos: async (req, res) => {
        try {
            const pedidos = await prisma.pedidoDelivery.findMany({
                include: { zona: true, repartidor: true },
                orderBy: { creadoEn: 'desc' }
            });
            res.json({ success: true, pedidos });
        } catch (error) { console.error(error); res.status(500).json({ error: 'Error al obtener pedidos' }); }
    },
    getPedido: async (req, res) => {
        try {
            const pedido = await prisma.pedidoDelivery.findUnique({
                where: { id: Number(req.params.id) },
                include: { zona: true, repartidor: true }
            });
            if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
            res.json({ success: true, pedido });
        } catch (error) { res.status(500).json({ error: 'Error al obtener el pedido' }); }
    },
    crearPedido: async (req, res) => {
        const { clienteNombre, telefono, direccion, zonaId, repartidorId, items, tarifa, total, observaciones } = req.body;
        try {
            if (!clienteNombre || !direccion) return res.status(400).json({ mensaje: 'Cliente y dirección son obligatorios' });
            if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ mensaje: 'Debe incluir al menos un ítem' });
            const tar = parseFloat(tarifa) || 0;
            const tot = total !== undefined ? parseFloat(total) : totalItems(items) + tar;
            const pedido = await prisma.pedidoDelivery.create({
                data: {
                    codigo: generarCodigo(),
                    clienteNombre,
                    telefono: telefono || null,
                    direccion,
                    zonaId: zonaId ? parseInt(zonaId) : null,
                    repartidorId: repartidorId ? parseInt(repartidorId) : null,
                    items,
                    tarifa: tar,
                    total: tot,
                    observaciones: observaciones || null
                },
                include: { zona: true, repartidor: true }
            });
            res.status(201).json({ success: true, pedido });
        } catch (error) { console.error(error); res.status(500).json({ error: 'Error al registrar pedido' }); }
    },
    editarPedido: async (req, res) => {
        const { clienteNombre, telefono, direccion, zonaId, repartidorId, items, tarifa, total, observaciones } = req.body;
        try {
            const pedido = await prisma.pedidoDelivery.update({
                where: { id: Number(req.params.id) },
                data: {
                    clienteNombre,
                    telefono: telefono || null,
                    direccion,
                    zonaId: zonaId ? parseInt(zonaId) : null,
                    repartidorId: repartidorId ? parseInt(repartidorId) : null,
                    items,
                    tarifa: parseFloat(tarifa) || 0,
                    total: total !== undefined ? parseFloat(total) : totalItems(items) + (parseFloat(tarifa) || 0),
                    observaciones: observaciones || null
                },
                include: { zona: true, repartidor: true }
            });
            res.json({ success: true, pedido });
        } catch (error) { res.status(500).json({ error: 'Error al actualizar pedido' }); }
    },
    cambiarEstado: async (req, res) => {
        const { estado, repartidorId } = req.body;
        try {
            const actual = await prisma.pedidoDelivery.findUnique({ where: { id: Number(req.params.id) } });
            if (!actual) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
            const data = { estado };
            if (estado === 'entregado') data.entregadoEn = new Date();
            if (repartidorId !== undefined) data.repartidorId = repartidorId ? parseInt(repartidorId) : null;
            const pedido = await prisma.pedidoDelivery.update({ where: { id: Number(req.params.id) }, data, include: { zona: true, repartidor: true } });
            res.json({ success: true, pedido });
        } catch (error) { res.status(500).json({ error: 'Error al cambiar estado del pedido' }); }
    },
    eliminarPedido: async (req, res) => {
        try {
            await prisma.pedidoDelivery.delete({ where: { id: Number(req.params.id) } });
            res.json({ success: true });
        } catch (error) { res.status(500).json({ error: 'Error al eliminar pedido' }); }
    }
};

module.exports = DeliveryController;