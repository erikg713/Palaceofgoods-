import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createAdapter } from "socket.io-redis";
import Redis from "ioredis";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/palace-of-goods";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

// Initialize Express & HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize Redis for WebSocket Scaling
const pubClient = new Redis(REDIS_URL);
const subClient = pubClient.duplicate();

// Initialize WebSocket Server
const io = new Server(server, {
  cors: { origin: FRONTEND_ORIGIN },
});

// Use Redis Adapter for WebSockets
io.adapter(createAdapter(pubClient, subClient));

// Connect to MongoDB with improved error handling
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health Check API Route
app.get("/", (req, res) => {
  res.json({ message: "Palace of Goods API is running" });
});

// WebSocket Authentication Middleware
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) throw new Error("Authentication error: No token provided");

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) throw new Error("Authentication error: Invalid token");
      socket.data.user = decoded; // Attach user data
      next();
    });
  } catch (err) {
    next(new Error(err.message));
  }
});

// WebSocket Handling
io.on("connection", (socket) => {
  console.log(`✅ WebSocket Connected: ${socket.id}, User: ${socket.data?.user?.email || "Unknown"}`);

  // Handle Order Updates
  socket.on("orderStatus", (data) => {
    io.emit("orderUpdate", data);
    pubClient.publish("orderUpdate", JSON.stringify(data));
  });

  // Handle Admin Announcements
  socket.on("adminMessage", (message) => {
    io.emit("newAdminMessage", message);
    pubClient.publish("adminMessage", JSON.stringify(message));
  });

  socket.on("disconnect", () => {
    console.log(`❌ WebSocket Disconnected: ${socket.id}`);
  });
});

// Redis Subscription to Listen for Events
subClient.subscribe("orderUpdate");
subClient.subscribe("adminMessage");

subClient.on("message", (channel, message) => {
  try {
    const parsedMessage = JSON.parse(message);
    if (channel === "orderUpdate") io.emit("orderUpdate", parsedMessage);
    if (channel === "adminMessage") io.emit("newAdminMessage", parsedMessage);
  } catch (error) {
    console.error(`❌ Redis Message Handling Error: ${error.message}`);
  }
});

// Start Server
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
