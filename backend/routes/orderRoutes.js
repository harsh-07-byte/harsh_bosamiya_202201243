const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getUserOrders);
router.get('/:id/items', authMiddleware, orderController.getOrderDetails);
router.get('/reports/daily-revenue', authMiddleware, adminMiddleware, orderController.getDailyRevenue);
router.get('/reports/top-customers', authMiddleware, adminMiddleware, orderController.getTopCustomers);

module.exports = router;
