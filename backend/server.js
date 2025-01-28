const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store messages (replace with DB in production)
const messages = {};

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a room for a specific buyer/seller chat
  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle message sending
  socket.on("sendMessage", ({ room, message, sender }) => {
    // Save message to the room's message list
    if (!messages[room]) messages[room] = [];
    messages[room].push({ sender, message });

    // Broadcast message to all users in the room
    io.to(room).emit("receiveMessage", { sender, message });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3002, () => console.log("Messaging server running on port 3002"));
