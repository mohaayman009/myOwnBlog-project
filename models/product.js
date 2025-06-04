const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    stock: { type: Number, default: 0 },
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);