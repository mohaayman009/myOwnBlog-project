const Cart = require('../models/cart');
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');

exports.getCart = asyncWrapper(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json({ status: httpStatusText=SUCCESS, data: { cart } });
});

exports.addToCart = asyncWrapper(async (req, res) => {
    // Implement logic to add item to cart
    res.json({ status: httpStatusText.SUCCESS, message: 'Item added to cart' });
});

exports.removeFromCart = asyncWrapper(async (req, res) => {
    // Implement logic to remove item from cart
    res.json({ status: httpStatusText.SUCCESS, message: 'Item removed from cart' });
});

exports.clearCart = asyncWrapper(async (req, res) => {
    // Implement logic to clear cart
    res.json({ status: httpStatusText.SUCCESS, message: 'Cart cleared' });
});