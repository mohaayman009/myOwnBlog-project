const Product = require('../models/product');
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');

exports.getAllProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find();
    res.json({ status: httpStatusText.SUCCESS, data: { products } });
});

exports.getProductById = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json({ status: httpStatusText.SUCCESS, data: { product } });
});

exports.createProduct = asyncWrapper(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { product } });
});

exports.updateProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ status: httpStatusText.SUCCESS, data: { product } });
});

exports.deleteProduct = asyncWrapper(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ status: httpStatusText.SUCCESS, message: 'Product deleted' });
});