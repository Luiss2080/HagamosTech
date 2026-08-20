const express = require('express');
const router = express.Router();
const CompraInsumoController = require('../controllers/11_CompraInsumoController');

router.get('/', CompraInsumoController.obtenerCompras);
router.get('/:id', CompraInsumoController.obtenerCompra);
router.post('/', CompraInsumoController.crearCompra);
router.put('/:id', CompraInsumoController.editarCompra);
router.put('/:id/anular', CompraInsumoController.anularCompra);
router.delete('/:id', CompraInsumoController.eliminarCompra);

module.exports = router;