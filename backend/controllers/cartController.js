const Product = require('../models/Product');

exports.calculateTotal = async (req, res) => {
  try {
    const { items } = req.body;

    let total = 0;
    const itemsWithPrice = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        itemsWithPrice.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          subtotal: itemTotal
        });
      }
    }

    res.json({ total, items: itemsWithPrice });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate total', error: error.message });
  }
};
