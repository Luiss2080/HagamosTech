const express = require('express');
const router = express.Router();
const StockController = require('../controllers/10_StockController');

router.get('/sucursales', StockController.getSucursales);
router.get('/resumen', StockController.getResumen);
router.get('/movimientos', StockController.getMovimientos);
router.get('/alertas', StockController.getAlertas);
router.post('/movimientos', StockController.crearMovimiento);
router.post('/transferencias', StockController.crearTransferencia);
router.put('/minimo', StockController.setMinimo);
router.delete('/movimientos/:id', StockController.eliminarMovimiento);

module.exports = router;