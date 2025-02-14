import pool from "../config/db";
import bcrypt from "bcryptjs";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export class UserModel {
  static async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [user.username, user.email, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByEmail(email: string) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }
}
