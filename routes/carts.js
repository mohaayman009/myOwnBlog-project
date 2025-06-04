const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.js');
const verifyToken = require('../middleware/verfiyToken');

// Get user's cart
router.get('/', verifyToken, cartsController.getCart);

// Add item to cart
router.post('/add', verifyToken, cartsController.addToCart);

// Remove item from cart
router.post('/remove', verifyToken, cartsController.removeFromCart);

// Clear cart
router.post('/clear', verifyToken, cartsController.clearCart);

module.exports = router;