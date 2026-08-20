const prisma = require('../../models/prisma');

const slugify = (str = '') =>
    str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const ProductoController = {
    obtenerProductos: async (req, res) => {
        try {
            const productos = await prisma.producto.findMany({
                include: { categoria: true },
                orderBy: { id: 'desc' }
            });
            res.json({ success: true, productos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    },

    obtenerProducto: async (req, res) => {
        try {
            const producto = await prisma.producto.findUnique({
                where: { id: Number(req.params.id) },
                include: { categoria: true }
            });
            if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
            res.json({ success: true, producto });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    },

    obtenerCategorias: async (req, res) => {
        try {
            const categorias = await prisma.categoria.findMany({
                where: { activo: true },
                orderBy: { orden: 'asc' }
            });
            res.json({ success: true, categorias });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener categorías' });
        }
    },

    crearProducto: async (req, res) => {
        const { nombre, enlace, categoriaId, precio, precioAnterior, descuento, calificacion, imagen, insignia, descripcion, descripcionCorta, disponibilidad, stock, activo } = req.body;
        try {
            if (!nombre || precio === undefined || precio === '' || !categoriaId) {
                return res.status(400).json({ mensaje: 'Nombre, precio y categoría son obligatorios' });
            }
            const slug = slugify(enlace || nombre);
            const existe = await prisma.producto.findFirst({ where: { enlace: slug } });
            if (existe) return res.status(400).json({ mensaje: 'El enlace del producto ya existe' });

            const producto = await prisma.producto.create({
                data: {
                    nombre,
                    enlace: slug,
                    precio: parseFloat(precio),
                    precioAnterior: precioAnterior ? parseFloat(precioAnterior) : null,
                    descuento: descuento || null,
                    calificacion: calificacion || null,
                    imagen: imagen || null,
                    insignia: insignia || null,
                    descripcion: descripcion || null,
                    descripcionCorta: descripcionCorta || null,
                    disponibilidad: disponibilidad || 'En stock',
                    stock: parseInt(stock) || 0,
                    activo: activo !== undefined ? !!activo : true,
                    categoria: { connect: { id: parseInt(categoriaId) } }
                },
                include: { categoria: true }
            });
            res.status(201).json({ success: true, producto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar producto' });
        }
    },

    editarProducto: async (req, res) => {
        const id = Number(req.params.id);
        const { nombre, enlace, categoriaId, precio, precioAnterior, descuento, calificacion, imagen, insignia, descripcion, descripcionCorta, disponibilidad, stock, activo } = req.body;
        try {
            if (!nombre || precio === undefined || precio === '' || !categoriaId) {
                return res.status(400).json({ mensaje: 'Nombre, precio y categoría son obligatorios' });
            }
            const slug = slugify(enlace || nombre);
            const existe = await prisma.producto.findFirst({ where: { enlace: slug, NOT: { id } } });
            if (existe) return res.status(400).json({ mensaje: 'El enlace del producto ya existe' });

            const producto = await prisma.producto.update({
                where: { id },
                data: {
                    nombre,
                    enlace: slug,
                    precio: parseFloat(precio),
                    precioAnterior: precioAnterior ? parseFloat(precioAnterior) : null,
                    descuento: descuento || null,
                    calificacion: calificacion || null,
                    imagen: imagen || null,
                    insignia: insignia || null,
                    descripcion: descripcion || null,
                    descripcionCorta: descripcionCorta || null,
                    disponibilidad: disponibilidad || 'En stock',
                    stock: parseInt(stock) || 0,
                    activo: activo !== undefined ? !!activo : true,
                    categoria: { connect: { id: parseInt(categoriaId) } }
                },
                include: { categoria: true }
            });
            res.json({ success: true, producto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar producto' });
        }
    },

    eliminarProducto: async (req, res) => {
        const id = Number(req.params.id);
        try {
            await prisma.inventarioSucursal.deleteMany({ where: { productoId: id } });
            await prisma.carrito_item.deleteMany({ where: { productoId: id } });
            const tieneVentas = await prisma.compra_item.findFirst({ where: { productoId: id } });
            if (tieneVentas) {
                return res.status(400).json({ mensaje: 'No se puede eliminar: el producto tiene ventas registradas' });
            }
            await prisma.producto.delete({ where: { id } });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar producto' });
        }
    }
};

module.exports = ProductoController;