import express from "express";
import { getAllMessages } from "../controllers/message";
const router = express.Router();

router.get("/allmessages", getAllMessages)

export default router;
