import mongoose from "mongoose";
import { createError } from "../error.js";
import bcrypt from "bcryptjs"
import User from "../models/User.js";
import Guest from "../models/Guest.js";
import Admin from "../models/Admin.js";
import userRepository from "../repository/userRepository.js";

let dictLogLikes = {}

export const addGuest = async (req, res, next) => {
  try {
    const guest = await Guest.findOne({userName: req.body.userName})
    if (guest) {
      res.status(200).json(guest);
    } else {
      res.status(200).json(await userRepository.signup({...req.body, password: '123'}, Guest))
    }
  } catch(e) {
    next(createError(500, "هذا المستخدم موجود بالفعل"))
  }
}
export const addAdmin = async (req, res, next) => {
  try {
    const newUser = new Admin({ ...req.body});

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(createError(400, "هذا المستخدم موجود"));
  }
}
export const update = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) throw new Error("invalid user id")
      for (const key in req.body) {
        user[key] = req.body[key]
      }
      await user.save()
      res.status(200).json(user);
    } catch (err) {
      res.status(400)
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
export const getLike = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({listLike: user.like})

  } catch (error) {
    next(error)
  }
}

export const getBlock = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({listBlock: user.block})

  } catch (error) {
    next(error)
  }
}
export const updateListBlock = async (req, res, next) => {
  try {

    if (req.body.check) {
      await User.findByIdAndUpdate(req.params.id, {
        $pull: {block: req.body.checkId}
      });
    } else {
      await User.findByIdAndUpdate(req.params.id, {
        $addToSet: {block: req.body.checkId}
      });
    }
    res.status(200).send("The block list is updated")

  } catch (error) {
    next(error)
  }
}
export const getAllUsers = async (req, res, next) => {
  try {
    const query = {}
    if (req.query.room)
    {
      query.room = req.query.room;
    }
    const allUsers = await User.find(query);
    res.status(200).json(allUsers)
  } catch (error) {
    next(error)
  }
}
export const updateChatBlock = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      chatBlock: !req.body.check
    })
    res.status(200).send("the chatBlock is updated")
  } catch (error) {
    next(error)
  }
}
export const updateInfoBlock = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      infoBlock: !req.body.check
    })
    res.status(200).send("the infoBlock is updated")
  } catch (error) {
    next(error)
  }
}
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
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

export const checkLike = async (req, res, next) => {
  const userFrom = req.body.userFrom;
  const userTo = req.body.userTo;
  let check = true;
  try {
    if (Object.keys(dictLogLikes).includes(userFrom)){
      if (!dictLogLikes[userFrom].includes(userTo)) {
        dictLogLikes[userFrom].push(userTo)
        setTimeout(async ()=> {
          dictLogLikes[userFrom].splice(dictLogLikes[userFrom].indexOf(userTo), 1);
        }, 10000)
      } else {
        check = false;
      }
    }else {
      dictLogLikes[userFrom] = [userTo];
      setTimeout(async ()=> {
        dictLogLikes[userFrom].splice(dictLogLikes[userFrom].indexOf(userTo), 1);
      }, 60000)
    }
    res.status(200).json({
      result: check
    })
  } catch (error) {
    next(error)
  }
}

export const updateLike = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {like: 1}
    })
    res.status(200).send("likes is increased")
  } catch (error) {
    next(error)
  }
}