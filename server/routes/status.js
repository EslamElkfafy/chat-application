import express from "express";
import { addStatus, getAllStatus } from "../controllers/status.js";

const router = express.Router();

// add post
router.post("/", addStatus);
// get all posts
router.get("/", getAllStatus)


export default router