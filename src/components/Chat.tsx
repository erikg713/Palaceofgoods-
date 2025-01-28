import React, { useState, useEffect } from "react";
import { joinRoom, sendMessage, onReceiveMessage } from "../services/socketService";

const Chat: React.FC<{ roomId: string; userId: string }> = ({ roomId, userId }) => {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    joinRoom(roomId);

    onReceiveMessage((data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [roomId]);
const [typing, setTyping] = useState<string | null>(null);

useEffect(() => {
  socket.on("showTyping", ({ sender }) => {
    setTyping(`${sender} is typing...`);
    setTimeout(() => setTyping(null), 2000);
  });
}, []);
  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(roomId, newMessage, userId);
      setMessages((prev) => [...prev, { sender: userId, message: newMessage }]);
      setNewMessage("");
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
