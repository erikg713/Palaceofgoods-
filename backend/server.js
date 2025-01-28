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
