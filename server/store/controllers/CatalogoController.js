const prisma = require('../../models/prisma');

const CatalogoController = {
    getProductos: async (req, res) => {
        try {
            const productos = await prisma.producto.findMany({
                include: { 
                    categoria: true,
                    inventarioSucursal: {
                        where: { sucursalId: 1 } // Sucursal Central
                    }
                }
            });

            // Mapear para simplificar la estructura del stock en el frontend
            const productosConStock = productos.map(p => ({
                ...p,
                stock: p.inventarioSucursal[0]?.stock || 0
            }));

            res.json(productosConStock);
        } catch (error) {
            console.error('Error al obtener productos con stock:', error);
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    },

    getCategorias: async (req, res) => {
        try {
            const categorias = await prisma.categoria.findMany({
                include: { _count: { select: { producto: true } } }
            });
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener categorías' });
        }
    },

    getFlujoConfig: async (req, res) => {
        try {
            const pasosFlujo = await prisma.pasosCatalogo.findMany({
                orderBy: { orden: 'asc' }
            });
            res.json({ pasosFlujo });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener configuración de catálogo' });
        }
    }
};

module.exports = CatalogoController;
