const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.js');

// Get all categories
router.get('/', categoriesController.getAllCategories);

// Get single category
router.get('/:id', categoriesController.getCategoryById);

// Create category
router.post('/', categoriesController.createCategory);

// Update category
router.patch('/:id', categoriesController.updateCategory);

// Delete category
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;