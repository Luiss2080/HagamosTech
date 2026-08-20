const express = require('express');
const router = express.Router();
const RolController = require('../controllers/04_RolController');

router.get('/', RolController.obtenerRoles);
router.post('/', RolController.crearRol);
router.get('/matriz-permisos', RolController.obtenerMatrizPermisos);
router.post('/matriz-permisos', RolController.actualizarPermisosRol);
router.put('/:id', RolController.editarRol);
router.delete('/:id', RolController.eliminarRol);

module.exports = router;
