import Message from "../models/Message.js";

export const addMessage = async (req, res) => {
  try {
    const { chatId, senderId, text, mediaUrl } = req.body;
    const message = new Message({ chatId, senderId, text, mediaUrl });
    const savedMessage = await message.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
