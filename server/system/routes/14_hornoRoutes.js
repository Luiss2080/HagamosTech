const express = require('express');
const router = express.Router();
const HornoController = require('../controllers/14_HornoController');

router.get('/', HornoController.obtener);
router.get('/:id', HornoController.obtenerById);
router.post('/', HornoController.crear);
router.put('/:id', HornoController.editar);
router.put('/:id/anular', HornoController.anular);
router.delete('/:id', HornoController.eliminar);

module.exports = router;