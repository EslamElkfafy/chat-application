import { createError } from "../error.js";
import Post from "../models/Post.js";

export const addPost = async (req, res, next) => {
  try {
    const newPost = new Post({...req.body});
    newPost.save()
    res.status(200).send("created a new post")
  } catch (error) {
    next(error)
  }
}

export const getAllPosts = async (req, res, next) => {
    try {
        const allPosts = await Post.find({})
        res.status(200).json(allPosts)
    } catch (error) {
        next(error)
    }
} 

export const updateLikeList = async (req, res, next) => {
    try {
        if (req.body.check) {
            await Post.findByIdAndUpdate(req.params.id, {
              $pull: {like: req.body.checkId}
            });
          } else {
            await Post.findByIdAndUpdate(req.params.id, {
              $addToSet: {like: req.body.checkId}
            });
          }
        res.status(200).send("the like list is updated")
    } catch (error) {
        next(error)
    }
} 
export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
} 
export const addComment = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $push: {messages: req.body}
    })
  } catch (error) {
    next(error)
  }
}