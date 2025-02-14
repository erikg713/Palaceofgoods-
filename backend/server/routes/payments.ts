import express from "express";
import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

Pi.init({ version: "2.0", sandbox: true });

router.post("/approve", async (req, res) => {
  try {
    const { paymentId } = req.body;
    await Pi.approvePayment(paymentId);
    res.json({ success: true, message: "Payment approved" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment approval failed" });
  }
});

export default router;
