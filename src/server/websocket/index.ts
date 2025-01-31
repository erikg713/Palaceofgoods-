// src/server/websocket/index.ts
import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { verifyToken } from '../middleware/auth';

export const initializeWebSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST']
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const user = await verifyToken(token);
      socket.data.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join user-specific room
    socket.join(`user:${socket.data.user.id}`);

    // Handle product updates
    socket.on('watchProduct', (productId) => {
      socket.join(`product:${productId}`);
    });

    socket.on('unwatchProduct', (productId) => {
      socket.leave(`product:${productId}`);
    });

    // Handle chat messages
    socket.on('sendMessage', async (data) => {
      try {
        const message = await chatService.saveMessage(data);
        io.to(`chat:${data.chatId}`).emit('newMessage', message);
      } catch (error) {
        console.error('Failed to send message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
