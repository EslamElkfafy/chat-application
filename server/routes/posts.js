import express from "express";
import { addComment, addPost, getAllPosts, getPost, updateLikeList } from "../controllers/post.js";

const router = express.Router();

// add post
router.post("/addpost", addPost);
// get all posts
router.get("/allposts", getAllPosts);
// update like list
router.put("/updatelike/:id", updateLikeList)
// get post
router.get("/getpost/:id", getPost)
// add comment
router.put("/addcomment/:id", addComment)
export default router;
