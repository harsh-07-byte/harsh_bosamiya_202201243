const pool = require('../config/database');

class OrderItem {
  static async create(orderId, productId, quantity, priceAtPurchase) {
    const query = 'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [orderId, productId, quantity, priceAtPurchase]);
    return result.rows[0];
  }

  static async findByOrderId(orderId) {
    const query = 'SELECT * FROM order_items WHERE order_id = $1';
    const result = await pool.query(query, [orderId]);
    return result.rows;
  }
}

module.exports = OrderItem;
