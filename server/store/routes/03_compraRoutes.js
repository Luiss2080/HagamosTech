const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/03_CompraController');

router.post('/crear', CompraController.crearCompra);
router.post('/confirmar-pago', CompraController.confirmarPagoYStock);

// Mock temporal: historial y factura aún sin backend real (el frontend ya los consulta)
router.get('/historial', (req, res) => res.json({ success: true, data: [], items: [], total: 0 }));
router.get('/factura/:pedidoId', (req, res) => res.json({ success: true, data: null, items: [], mensaje: null }));

router.get('/:id', CompraController.getCompraById);

module.exports = router;
