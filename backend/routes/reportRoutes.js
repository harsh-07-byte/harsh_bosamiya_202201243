const express = require('express');
const { getDailyRevenue, getCategorySales } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/daily-revenue', protect, authorize('ADMIN'), getDailyRevenue);
router.get('/category-sales', protect, authorize('ADMIN'), getCategorySales);

module.exports = router;