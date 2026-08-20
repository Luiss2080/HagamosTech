const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/02_ClienteController');

router.get('/', ClienteController.obtenerClientes);
router.post('/registrar', ClienteController.registrarCliente);
router.put('/editar', ClienteController.editarCliente);
router.post('/eliminar', ClienteController.eliminarCliente);

module.exports = router;
