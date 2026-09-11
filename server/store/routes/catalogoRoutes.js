const express = require('express');
const router = express.Router();
const CatalogoController = require('../controllers/CatalogoController');

router.get('/productos', CatalogoController.getProductos);
router.get('/categorias', CatalogoController.getCategorias);
router.get('/categories', CatalogoController.getCategorias);
router.get('/config', CatalogoController.getFlujoConfig);

module.exports = router;
