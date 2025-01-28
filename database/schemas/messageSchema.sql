const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

app.post("/api/messages", async (req, res) => {
  const { room, sender, message } = req.body;
  const newMessage = new Message({ room, sender, message });
  await newMessage.save();
  res.status(201).send(newMessage);
});
