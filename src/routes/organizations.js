const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organizations');

router.post('/login', orgController.login);
router.post('/create', orgController.createUser);

module.exports = router;
