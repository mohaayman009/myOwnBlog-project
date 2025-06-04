const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.js');
const verifyToken = require('../middleware/verfiyToken');

// Process payment
router.post('/checkout', verifyToken, paymentController.checkout);

module.exports = router;