const express = require('express');
const router = express.Router();
const controller = require('../controllers/health.controller');

router.get('/healthz', controller.healthz);
router.get('/readyz', controller.readyz);
router.get('/version', controller.getVersion);

module.exports = router;


