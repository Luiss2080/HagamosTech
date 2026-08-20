const express = require('express');
const router = express.Router();
const SucursalController = require('../controllers/12_SucursalController');

router.get('/', SucursalController.obtenerSucursales);
router.get('/:id', SucursalController.obtenerSucursal);
router.post('/', SucursalController.crearSucursal);
router.put('/:id', SucursalController.editarSucursal);
router.delete('/:id', SucursalController.eliminarSucursal);

module.exports = router;