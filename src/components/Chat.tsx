// src/components/Chat.tsx

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

interface ChatProps {
  roomId: string;
  userId: string;
}

const Chat: React.FC<ChatProps> = ({ roomId, userId }) => {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', { room: roomId });

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleSend = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', { room: roomId, sender: userId, message: newMessage });
      setMessages((prev) => [...prev, { sender: userId, message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
