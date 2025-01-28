import { io } from "socket.io-client";

const socket = io("http://localhost:3002");

export const joinRoom = (room: string) => {
  socket.emit("joinRoom", { room });
};

export const sendMessage = (room: string, message: string, sender: string) => {
  socket.emit("sendMessage", { room, message, sender });
};

export const onReceiveMessage = (callback: (data: { sender: string; message: string }) => void) => {
  socket.on("receiveMessage", callback);
};

export default socket;
