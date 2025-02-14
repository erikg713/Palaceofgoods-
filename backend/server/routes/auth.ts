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
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await UserModel.findByEmail(email);

  if (existingUser) return res.status(400).json({ message: "Email already registered" });

  const user = await UserModel.create({ username, email, password });
  res.json(user);
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findByEmail(email);

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
