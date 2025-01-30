import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Create Express App & HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize WebSocket Server
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }, // Allow frontend to connect
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/palace-of-goods", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example API Route
app.get("/", (req, res) => {
  res.send("Palace of Goods API is running");
});

// WebSocket Setup
io.on("connection", (socket) => {
  console.log("✅ WebSocket Connected:", socket.id);

  // Handle Order Status Updates
  socket.on("orderStatus", (data) => {
    io.emit("orderUpdate", data); // Notify all users
  });

  // Handle Admin Announcements
  socket.on("adminMessage", (message) => {
    io.emit("newAdminMessage", message); // Notify all users
  });

  socket.on("disconnect", () => {
    console.log("❌ WebSocket Disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createAdapter } from "socket.io-redis";
import Redis from "ioredis";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

// Initialize Express & HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize Redis for WebSocket Scaling
const pubClient = new Redis("redis://localhost:6379"); // Publisher
const subClient = pubClient.duplicate(); // Subscriber

// Initialize WebSocket Server
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }, // Allow frontend
});

// Use Redis Adapter for WebSockets
io.adapter(createAdapter(pubClient, subClient));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/palace-of-goods", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.get("/", (req, res) => {
  res.send("Palace of Goods API is running");
});

// WebSocket Authentication Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err) return next(new Error("Authentication error: Invalid token"));
    socket.data.user = decoded; // Attach user data to socket session
    next();
  });
});

// WebSocket Handling
io.on("connection", (socket) => {
  console.log(`✅ WebSocket Connected: ${socket.id}, User: ${socket.data.user.email}`);

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
  const parsedMessage = JSON.parse(message);
  if (channel === "orderUpdate") io.emit("orderUpdate", parsedMessage);
  if (channel === "adminMessage") io.emit("newAdminMessage", parsedMessage);
});

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
