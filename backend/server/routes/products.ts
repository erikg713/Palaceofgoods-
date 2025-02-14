import express from "express";
import pool from "../config/database";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await pool.query("SELECT * FROM products");
  res.json(products.rows);
});

router.post("/", async (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = await pool.query(
    "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
    [name, price, description]
  );
  res.json(newProduct.rows[0]);
});

export default router;
