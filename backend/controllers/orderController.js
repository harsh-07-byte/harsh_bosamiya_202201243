const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      total += product.price * item.quantity;
    }

    const order = await Order.create(userId, total);

    for (const item of items) {
      const product = await Product.findById(item.productId);
      await OrderItem.create(order.id, item.productId, item.quantity, product.price);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const items = await OrderItem.findByOrderId(req.params.id);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order details', error: error.message });
  }
};

exports.getDailyRevenue = async (req, res) => {
  try {
    const revenue = await Order.getDailyRevenue();
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch revenue', error: error.message });
  }
};

exports.getTopCustomers = async (req, res) => {
  try {
    const customers = await Order.getTopCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch top customers', error: error.message });
  }
};
