const prisma = require('../config/prisma');
const mongoose = require('mongoose');

const getDailyRevenue = async (req, res) => {
  try {
    const dailyRevenue = await prisma.$queryRaw`
      SELECT 
        DATE("createdAt") as date, 
        SUM(total) as revenue
      FROM "Order"
      GROUP BY DATE("createdAt")
      ORDER BY date ASC;
    `;
    res.json(dailyRevenue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCategorySales = async (req, res) => {
  try {
    const orderItems = await prisma.orderItem.findMany();

    const productIds = [...new Set(orderItems.map(item => item.productId))];

    const products = await mongoose.model('Product').find({ '_id': { $in: productIds } }).select('category');

    const categoryMap = {};
    products.forEach(p => {
      categoryMap[p._id.toString()] = p.category; 
    });

    const categorySales = {};
    orderItems.forEach(item => {
      const category = categoryMap[item.productId]; 
      if (category) {
        if (!categorySales[category]) {
          categorySales[category] = 0;
        }
        categorySales[category] += item.quantity * item.priceAtPurchase;
      }
    });

    const result = Object.keys(categorySales).map(category => ({
      category,
      totalSales: categorySales[category]
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getDailyRevenue, getCategorySales };