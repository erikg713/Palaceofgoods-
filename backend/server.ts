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
