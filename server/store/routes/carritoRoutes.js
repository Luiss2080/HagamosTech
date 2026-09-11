const express = require('express');
const router = express.Router();
const CarritoController = require('../controllers/CarritoController');

router.get('/', CarritoController.getCarrito);
router.post('/', CarritoController.addItem);
router.delete('/limpiar', CarritoController.clearCart);
router.delete('/:id', CarritoController.removeItem);

module.exports = router;
