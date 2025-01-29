import express from "express";
import { io } from "./server"; // Import WebSocket server

const router = express.Router();

interface Order {
  id: string;
  status: "pending" | "shipped" | "delivered";
}

let orders: Order[] = []; // Temporary in-memory storage

// Create new order
router.post("/", (req, res) => {
  const newOrder: Order = { id: `order-${Date.now()}`, status: "pending" };
  orders.push(newOrder);

  io.emit("orderUpdate", { id: newOrder.id, status: newOrder.status }); // Notify frontend
  res.status(201).json(newOrder);
});

// Update order status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find((o) => o.id === id);

  if (!order) return res.status(404).send("Order not found");

  order.status = status;
  io.emit("orderUpdate", { id: order.id, status: order.status }); // Notify users

  res.json(order);
});

export default router;
