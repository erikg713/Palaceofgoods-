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

  // Notify frontend about the new order
  io.emit("orderUpdate", { id: newOrder.id, status: newOrder.status });
  res.status(201).json(newOrder);
});

// Update order status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // Validate the new status
  if (!["pending", "shipped", "delivered"].includes(status)) {
    return res.status(400).send("Invalid status");
  }

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).send("Order not found");
  }

  // Update order status and notify users
  order.status = status;
  io.emit("orderUpdate", { id: order.id, status: order.status });

  res.json(order);
});

export default router;
import Pi from "pi-sdk";

const pi = new Pi("YOUR_PI_APP_ID", "YOUR_PI_PRIVATE_KEY");

// Initiate Pi Payment
router.post("/pay", authenticateJWT, async (req, res) => {
  try {
    const { product_id, amount, buyer_username } = req.body;

    // Create a payment request
    const payment = await pi.createPayment({
      amount,
      memo: `Payment for product ID: ${product_id}`,
      metadata: { product_id },
      uid: buyer_username,
    });

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Payment initiation failed", error });
  }
});
