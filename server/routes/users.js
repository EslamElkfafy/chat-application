import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  updatePrivate,
  getPrivate,
  updateListLike,
  getLike,
  getBlock,
  updateListBlock
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", update);

//get user by socketID
router.get("/socket/:socketId", getUser);
// update private
router.put("/updateprivate/:id", updatePrivate);
// get praivate
router.get("/getprivate/:id", getPrivate);
// get like list
router.get("/like/:id", getLike);
// update like list
router.put("/updatelike/:id", updateListLike)
// get block list
router.get("/block/:id", getBlock);
// update like list
router.put("/updateblock/:id", updateListBlock)
//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
// router.put("/like/:videoId", verifyToken, like);

// //dislike a video
// router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
