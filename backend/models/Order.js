const pool = require('../config/database');

class Order {
  static async create(userId, total) {
    const query = 'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [userId, total]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async getDailyRevenue() {
    const query = `
      SELECT DATE(created_at) as date, SUM(total) as revenue
      FROM orders
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getTopCustomers() {
    const query = `
      SELECT u.name, u.email, COUNT(o.id) as order_count, SUM(o.total) as total_spent
      FROM users u
      JOIN orders o ON u.id = o.user_id
      GROUP BY u.id, u.name, u.email
      ORDER BY total_spent DESC
      LIMIT 10
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Order;
