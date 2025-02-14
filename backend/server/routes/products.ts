import express from "express";
import pool from "../config/database";
import express from "express";
import { ProductModel } from "../models/Product";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

// Create Product
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { name, description, price, image_url } = req.body;
    const seller_id = (req as any).user.id;
    const product = await ProductModel.create({ name, description, price, image_url, seller_id });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Get Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.getById(parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// Update Product
router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedProduct = await ProductModel.update(parseInt(req.params.id), req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// Delete Product
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    await ProductModel.delete(parseInt(req.params.id));
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

export default router;
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
