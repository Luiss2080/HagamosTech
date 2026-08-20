const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/01_AuthController');

router.post('/login', AuthController.login);
router.post('/registro', AuthController.registro);
router.post('/2fa/verificar', AuthController.verificar2fa);
router.post('/2fa/regenerar-qr', AuthController.regenerarQR2FA);
router.post('/verificar-correo', AuthController.verificarCorreo);
router.post('/reenviar-correo', AuthController.reenviarCorreo);
router.post('/solicitar-recuperacion', AuthController.solicitarRecuperacion);
router.post('/restablecer-contrasena', AuthController.restablecerContrasena);

module.exports = router;
