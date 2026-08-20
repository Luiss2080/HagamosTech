const express = require('express');
const router = express.Router();
const PermisoController = require('../controllers/05_PermisoController');

router.get('/', PermisoController.obtenerPermisos);
router.post('/', PermisoController.crearPermiso);
router.put('/:id', PermisoController.editarPermiso);
router.delete('/:id', PermisoController.eliminarPermiso);

module.exports = router;
