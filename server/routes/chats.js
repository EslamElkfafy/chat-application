import express from "express";
import { getPrivate, addChat, getMessages, updateMessages } from "../controllers/chat.js";

const router = express.Router()

// add chat
router.post("/addchat", addChat);
// update messages
router.put("/messages/:id", updateMessages)
// get messages
router.get("/messages/:id", getMessages)

router.get("/getprivate/:id", getPrivate)
export default router;