const prisma = require('../../models/prisma');

const CompraController = {
    crearCompra: async (req, res) => {
        const { metodoPago, datosEnvio, total } = req.body;
        
        try {
            // 1. Obtener usuario (simulado por ahora)
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

            // 2. Obtener items del carrito
            const itemsCarrito = await prisma.carritoItem.findMany({
                where: { usuarioId: usuario.id },
                include: { producto: true }
            });

            if (itemsCarrito.length === 0) {
                return res.status(400).json({ mensaje: 'El carrito está vacío' });
            }

            // 3. Verificar stock en la sucursal (usaremos la sucursal 1 por defecto para este demo)
            const sucursal = await prisma.sucursal.findFirst() || await prisma.sucursal.create({
                data: { nombre: 'Sucursal Central', ciudad: 'Santa Cruz', direccion: 'Av. Principal 123' }
            });

            // Verificar disponibilidad de todos los productos
            for (const item of itemsCarrito) {
                const stockItem = await prisma.inventarioSucursal.findUnique({
                    where: {
                        sucursalId_productoId: {
                            sucursalId: sucursal.id,
                            productoId: item.productoId
                        }
                    }
                });

                if (!stockItem || stockItem.stock < item.cantidad) {
                    return res.status(400).json({ 
                        mensaje: `Stock insuficiente para: ${item.producto.nombre}. Disponible: ${stockItem?.stock || 0}` 
                    });
                }
            }

            // 4. Crear la Compra en una transacción
            const resultado = await prisma.$transaction(async (tx) => {
                // a. Crear registro de Compra
                const nuevaCompra = await tx.compra.create({
                    data: {
                        codigo: `ESP-${Math.floor(100000 + Math.random() * 900000)}`,
                        usuarioId: usuario.id,
                        sucursalId: sucursal.id,
                        metodoPago: metodoPago.toLowerCase(),
                        estado: 'pendiente_pago',
                        totalBs: total,
                        nombreCompleto: datosEnvio.nombre || usuario.nombre,
                        telefono: datosEnvio.telefono || '00000000',
                        ciudad: datosEnvio.ciudad || 'Santa Cruz',
                        direccion: datosEnvio.direccion || 'Recojo en sucursal',
                        items: {
                            create: itemsCarrito.map(item => ({
                                productoId: item.productoId,
                                cantidad: item.cantidad,
                                precioUnitario: item.producto.precio,
                                subtotal: item.producto.precio * item.cantidad
                            }))
                        }
                    }
                });

                // b. Crear registro de Pago (Pendiente)
                await tx.pago.create({
                    data: {
                        compraId: nuevaCompra.id,
                        metodoPago: metodoPago.toLowerCase(),
                        monto: total,
                        estado: 'pendiente'
                    }
                });

                return nuevaCompra;
            });

            res.status(201).json({ 
                success: true, 
                compraId: resultado.id, 
                codigo: resultado.codigo 
            });

        } catch (error) {
            console.error('--- ERROR AL CREAR COMPRA ---');
            console.error('Mensaje:', error.message);
            console.error('Código:', error.code);
            console.error('Stack:', error.stack);
            console.error('-----------------------------');
            res.status(500).json({ 
                error: 'Error interno al procesar la compra',
                detalles: error.message,
                codigo: error.code
            });
        }
    },

    confirmarPagoYStock: async (req, res) => {
        const { compraId, referencia } = req.body;

        try {
            const resultado = await prisma.$transaction(async (tx) => {
                // 1. Obtener la compra con sus items
                const compra = await tx.compra.findUnique({
                    where: { id: parseInt(compraId) },
                    include: { items: true }
                });

                if (!compra) throw new Error('Compra no encontrada');
                if (compra.estado === 'pagado') return compra; // Ya procesado

                // 2. Actualizar estado de la compra y el pago
                await tx.compra.update({
                    where: { id: compra.id },
                    data: { estado: 'pagado' }
                });

                await tx.pago.updateMany({
                    where: { compraId: compra.id },
                    data: { 
                        estado: 'pagado',
                        referencia: referencia || 'PAGO_CONFIRMADO',
                        fechaPago: new Date()
                    }
                });

                // 3. ACTUALIZACIÓN DE STOCK (Control de InventarioSucursal)
                for (const item of compra.items) {
                    await tx.inventarioSucursal.update({
                        where: {
                            sucursalId_productoId: {
                                sucursalId: compra.sucursalId,
                                productoId: item.productoId
                            }
                        },
                        data: {
                            stock: {
                                decrement: item.cantidad
                            }
                        }
                    });
                }

                // 4. Limpiar carrito del usuario
                await tx.carritoItem.deleteMany({
                    where: { usuarioId: compra.usuarioId }
                });

                return compra;
            });

            res.json({ success: true, message: 'Pago procesado y stock actualizado correctamente' });

        } catch (error) {
            console.error('Error al confirmar pago:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getCompraById: async (req, res) => {
        const { id } = req.params;
        try {
            const compra = await prisma.compra.findUnique({
                where: { id: parseInt(id) },
                include: {
                    items: {
                        include: { producto: true }
                    },
                    sucursal: true,
                    pagos: true
                }
            });
            if (!compra) return res.status(404).json({ mensaje: 'Compra no encontrada' });
            res.json(compra);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener detalles de la compra' });
        }
    }
};

module.exports = CompraController;
