const prisma = require('../../models/prisma');
const estadosPago = {};

const PagoController = {
    obtenerEstado: (req, res) => {
        const id = req.params.id.toString();
        const status = estadosPago[id] || 'pendiente';
        res.json({ status });
    },

    confirmarPago: async (req, res) => {
        const id = req.body.id.toString(); // Este es el codigo (ESP-XXXXXX)
        const { monto, compraId } = req.body;
        
        console.log(`\x1b[32m%s\x1b[0m`, `[PAGOS] ¡CONFIRMADO! Orden #${id} por Bs. ${monto}`);
        
        try {
            if (compraId) {
                // Si viene compraId, finalizamos la compra en la BD real
                await prisma.$transaction(async (tx) => {
                    const compra = await tx.compra.findUnique({
                        where: { id: parseInt(compraId) },
                        include: { items: true }
                    });

                    if (!compra || compra.estado === 'pagado') return;

                    // Actualizar compra y pago
                    await tx.compra.update({
                        where: { id: compra.id },
                        data: { estado: 'pagado' }
                    });

                    await tx.pago.updateMany({
                        where: { compraId: compra.id },
                        data: { 
                            estado: 'pagado',
                            referencia: 'PAGO_MOVIL_QR',
                            fechaPago: new Date()
                        }
                    });

                    // Descontar Stock
                    for (const item of compra.items) {
                        await tx.inventarioSucursal.update({
                            where: {
                                sucursalId_productoId: {
                                    sucursalId: compra.sucursalId,
                                    productoId: item.productoId
                                }
                            },
                            data: { stock: { decrement: item.cantidad } }
                        });
                    }

                    // Limpiar carrito
                    await tx.carritoItem.deleteMany({
                        where: { usuarioId: compra.usuarioId }
                    });
                });
            }

            // Mantener el estado en memoria para el polling del frontend
            estadosPago[id] = 'pagado';
            res.json({ success: true, message: 'Pago confirmado y stock actualizado' });

        } catch (error) {
            console.error('Error procesando pago real:', error);
            res.status(500).json({ error: 'Error al procesar el pago en la base de datos' });
        }
    }
};

module.exports = PagoController;
