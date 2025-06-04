const Category = require('../models/category');
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');

exports.getAllCategories = asyncWrapper(async (req, res) => {
    const categories = await Category.find();
    res.json({ status: httpStatusText.SUCCESS, data: { categories } });
});

exports.getCategoryById = asyncWrapper(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json({ status: httpStatusText.SUCCESS, data: { category } });
});

exports.createCategory = asyncWrapper(async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { category } });
});

exports.updateCategory = asyncWrapper(async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ status: httpStatusText.SUCCESS, data: { category } });
});

exports.deleteCategory = asyncWrapper(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ status: httpStatusText.SUCCESS, message: 'Category deleted' });
});