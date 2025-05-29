const express = require('express');
const PublicController = require('../controllers/publicController');
const router = express.Router();

router.get('/home', PublicController.home);

module.exports = router;
