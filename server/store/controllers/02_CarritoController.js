const prisma = require('../../models/prisma');

// Helper simulado
const getUsuarioId = async (req) => {
    let usuario = await prisma.clienteUsuario.findFirst();
    if (!usuario) {
        usuario = await prisma.clienteUsuario.create({
            data: {
                correo: 'cliente@loscatoresscz.com',
                contrasena: 'loscatoresscz123',
                nombre: 'Cliente General',
                fechaActualizacion: new Date()
            }
        });
    }
    return usuario ? usuario.id : null;
};

const CarritoController = {
    getCarrito: async (req, res) => {
        try {
            const usuarioId = await getUsuarioId(req);
            if (!usuarioId) return res.status(401).json({ mensaje: 'No autorizado' });

            const items = await prisma.carrito_item.findMany({
                where: { usuarioId },
                include: { producto: true }
            });

            const total = items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
            const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

            res.json({
                items: items.map(item => ({
                    id: item.id,
                    cantidad: item.cantidad,
                    subtotal: item.producto.precio * item.cantidad,
                    producto: {
                        id: item.producto.id,
                        nombre: item.producto.nombre,
                        precio: item.producto.precio,
                        imagen: item.producto.imagen,
                        sku: item.producto.sku
                    }
                })),
                resumen: {
                    total_bs: total,
                    cantidad_total: cantidadTotal
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el carrito' });
        }
    },

    addItem: async (req, res) => {
        const { producto_id, cantidad } = req.body;
        const qtyToAdd = cantidad || 1;

        try {
            const usuarioId = await getUsuarioId(req);
            if (!usuarioId) return res.status(401).json({ mensaje: 'No autorizado' });

            // 1. Verificar stock disponible en sucursal central (ID 1 por defecto)
            const stockRecord = await prisma.inventarioSucursal.findUnique({
                where: {
                    sucursalId_productoId: {
                        sucursalId: 1, // Sucursal Central
                        productoId: parseInt(producto_id)
                    }
                }
            });

            if (!stockRecord || stockRecord.stock <= 0) {
                return res.status(400).json({ mensaje: 'Stock agotado' });
            }

            // 2. Calcular cantidad total deseada (existente + nueva)
            const itemExistente = await prisma.carrito_item.findFirst({
                where: { usuarioId, productoId: parseInt(producto_id) }
            });

            const nuevaCantidadTotal = (itemExistente?.cantidad || 0) + qtyToAdd;

            if (stockRecord.stock < nuevaCantidadTotal) {
                return res.status(400).json({ 
                    mensaje: `Stock insuficiente. Disponible: ${stockRecord.stock}. Ya tienes ${itemExistente?.cantidad || 0} en el carrito.` 
                });
            }

            // 3. Proceder con la inserción/actualización
            if (itemExistente) {
                await prisma.carrito_item.update({
                    where: { id: itemExistente.id },
                    data: { cantidad: nuevaCantidadTotal }
                });
            } else {
                await prisma.carrito_item.create({
                    data: {
                        usuarioId,
                        productoId: parseInt(producto_id),
                        cantidad: qtyToAdd
                    }
                });
            }
            res.json({ success: true, mensaje: 'Producto añadido con éxito' });
        } catch (error) {
            console.error('Error al añadir al carrito:', error);
            res.status(500).json({ error: 'Error al añadir al carrito' });
        }
    },

    removeItem: async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.carrito_item.delete({
                where: { id: parseInt(id) }
            });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar item' });
        }
    },

    clearCart: async (req, res) => {
        try {
            const usuarioId = await getUsuarioId(req);
            await prisma.carrito_item.deleteMany({
                where: { usuarioId }
            });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al limpiar carrito' });
        }
    }
};

module.exports = CarritoController;
