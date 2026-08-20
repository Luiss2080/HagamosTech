const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/08_ProductoController');

router.get('/categorias', ProductoController.obtenerCategorias);
router.get('/', ProductoController.obtenerProductos);
router.get('/:id', ProductoController.obtenerProducto);
router.post('/', ProductoController.crearProducto);
router.put('/:id', ProductoController.editarProducto);
router.delete('/:id', ProductoController.eliminarProducto);

module.exports = router;