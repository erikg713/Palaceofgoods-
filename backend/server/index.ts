import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import pool from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Test DB Connection
pool.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("DB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Palace of Goods Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
