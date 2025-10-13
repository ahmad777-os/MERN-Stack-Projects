import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const existingChat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (existingChat) return res.status(200).json(existingChat);

    const newChat = new Chat({ members: [senderId, receiverId] });
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: { $in: [req.params.userId] } });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
