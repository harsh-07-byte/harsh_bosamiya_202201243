const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: { updatedAt: true, createdAt: false }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;