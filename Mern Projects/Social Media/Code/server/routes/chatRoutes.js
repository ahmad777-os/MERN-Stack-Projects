import express from "express";
import { createChat, getUserChats, findChat } from "../controllers/chatController.js";
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", getUserChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
