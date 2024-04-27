import mongoose from "mongoose";
import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
};
export const updatePrivate = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $addToSet: {private: req.body.userId}
    })
    res.status(200).send("the private is updated");
  } catch (error) {
    next(error)
  }
}
export const getPrivate = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
  
}
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUserBySocketId = async (req, res, next) => {
  try {
    const socketId = req.params.socketId;
    const user = await User.findOne({socketId: socketId})
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
}

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const videoId = req.params.videoId;
  const userId = req.user.id;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId }
    });
    res.status(200).json("like operation has been succussed");
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  const videoId = req.params.videoId;
  const userId = req.user.id;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId }
    });
    res.status(200).json("dislike operation has been succussed");
  } catch (error) {
    next(error);
  }
};
