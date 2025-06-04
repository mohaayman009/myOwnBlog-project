const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.js');

// Get all products
router.get('/', productsController.getAllProducts);

// Get single product
router.get('/:id', productsController.getProductById);

// Create product
router.post('/', productsController.createProduct);

// Update product
router.patch('/:id', productsController.updateProduct);

// Delete product
router.delete('/:id', productsController.deleteProduct);

module.exports = router;