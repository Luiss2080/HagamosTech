const express = require('express');
const router = express.Router();
const CuponController = require('../controllers/CuponController');

router.post('/activar', CuponController.reclamarCupon);
router.post('/extender', CuponController.extenderCupon);

module.exports = router;
