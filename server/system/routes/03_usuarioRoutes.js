const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/03_UsuarioController');

router.get('/', UsuarioController.obtenerUsuarios);
router.post('/', UsuarioController.crearUsuario);
router.put('/:id/estado', UsuarioController.cambiarEstadoUsuario);
router.put('/:id', UsuarioController.editarUsuario);
router.get('/invitados', UsuarioController.obtenerInvitados);
module.exports = router;
