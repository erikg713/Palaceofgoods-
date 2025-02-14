import pool from "../config/db";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  seller_id: number;
}

export class ProductModel {
  static async create(product: Product) {
    const result = await pool.query(
      "INSERT INTO products (name, description, price, image_url, seller_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [product.name, product.description, product.price, product.image_url, product.seller_id]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    return result.rows;
  }

  static async getById(id: number) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async update(id: number, updates: Partial<Product>) {
    const fields = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 1}`)
      .join(", ");
    const values = Object.values(updates);

    const result = await pool.query(
      `UPDATE products SET ${fields} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0];
  }

  static async delete(id: number) {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return { message: "Product deleted successfully" };
  }
}
