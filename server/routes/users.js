import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  updatePrivate,
  getPrivate,
  getLike,
  getBlock,
  updateListBlock,
  getAllUsers,
  updateChatBlock,
  updateInfoBlock,
  updateLike,
  checkLike
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/checklikes", checkLike)
router.put("/updatelike/:id", updateLike)
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
// get block list
router.get("/block/:id", getBlock);
// update block list
router.put("/updateblock/:id", updateListBlock)
// get all users
router.get("/findall", getAllUsers)
// update ChatBlock 
router.put("/chatblock/:id", updateChatBlock)
// update InfoBlock 
router.put("/infoblock/:id", updateInfoBlock)
//delete user
router.delete("/:id", deleteUser);

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
