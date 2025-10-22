const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/calculate', authMiddleware, cartController.calculateTotal);

module.exports = router;
