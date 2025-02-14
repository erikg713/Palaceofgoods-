import pool from "../config/db";

export interface Order {
  id?: number;
  buyer_id: number;
  product_id: number;
  amount: number;
  status?: string;
}

export class OrderModel {
  static async create(order: Order) {
    const result = await pool.query(
      "INSERT INTO orders (buyer_id, product_id, amount) VALUES ($1, $2, $3) RETURNING *",
      [order.buyer_id, order.product_id, order.amount]
    );
    return result.rows[0];
  }

  static async getByUser(userId: number) {
    const result = await pool.query("SELECT * FROM orders WHERE buyer_id = $1", [userId]);
    return result.rows;
  }
}
