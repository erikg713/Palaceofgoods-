import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashedPassword]
  );

  res.json(newUser.rows[0]);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (!user.rows.length) return res.status(400).json({ message: "User not found" });

  const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!isValidPassword) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
