import { createError } from "../error.js";
import Message from "../models/Message.js";


export const getAllMessages = async (req, res, next) => {
  try {
    const Messages = await Message.find({});
    res.status(200).json((Messages))
  } catch (error) {
    next(error)
  }
}