const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/04_PagoController');

router.get('/estado/:id', PagoController.obtenerEstado);
router.post('/confirmar', PagoController.confirmarPago);

module.exports = router;
