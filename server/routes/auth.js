import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";
import { addGuest } from "../controllers/user.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

router.post("/guest", addGuest)

//GOOGLE AUTH
router.post("/google", googleAuth)

export default router;
