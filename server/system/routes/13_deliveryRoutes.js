const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/13_DeliveryController');

router.get('/zonas', DeliveryController.getZonas);
router.post('/zonas', DeliveryController.crearZona);
router.put('/zonas/:id', DeliveryController.editarZona);
router.delete('/zonas/:id', DeliveryController.eliminarZona);

router.get('/repartidores', DeliveryController.getRepartidores);
router.post('/repartidores', DeliveryController.crearRepartidor);
router.put('/repartidores/:id', DeliveryController.editarRepartidor);
router.delete('/repartidores/:id', DeliveryController.eliminarRepartidor);

router.get('/pedidos', DeliveryController.getPedidos);
router.get('/pedidos/:id', DeliveryController.getPedido);
router.post('/pedidos', DeliveryController.crearPedido);
router.put('/pedidos/:id', DeliveryController.editarPedido);
router.put('/pedidos/:id/estado', DeliveryController.cambiarEstado);
router.delete('/pedidos/:id', DeliveryController.eliminarPedido);

module.exports = router;