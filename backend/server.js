const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/palace-of-goods", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example default route
app.get("/", (req, res) => {
  res.send("Palace of Goods API is running");
});

// WebSocket setup
io.on("connection", (socket) => {
  console.log("WebSocket connection established", socket.id);

  socket.on("disconnect", () => {
    console.log("WebSocket connection closed", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Backend server running on port 3001");
});
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }, // Allow frontend access
});

app.use(cors());
app.use(express.json());

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for order status updates
  socket.on("orderStatus", (data) => {
    io.emit("orderUpdate", data); // Broadcast to all users
  });

  // Listen for admin announcements
  socket.on("adminMessage", (message) => {
    io.emit("newAdminMessage", message); // Notify all users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3002, () => console.log("Notifications server running on port 3002"));
