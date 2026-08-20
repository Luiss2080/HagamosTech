const express = require('express');
const router = express.Router();
const CatalogoController = require('../controllers/01_CatalogoController');

router.get('/productos', CatalogoController.getProductos);
router.get('/categorias', CatalogoController.getCategorias);
router.get('/categories', CatalogoController.getCategorias);
router.get('/config', CatalogoController.getFlujoConfig);

module.exports = router;
