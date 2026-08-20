const express = require('express');
const router = express.Router();
const VentaController = require('../controllers/09_VentaController');

router.get('/', VentaController.obtenerVentas);
router.get('/:id', VentaController.obtenerVenta);
router.post('/', VentaController.crearVenta);
router.put('/:id/anular', VentaController.anularVenta);
router.delete('/:id', VentaController.eliminarVenta);

module.exports = router;