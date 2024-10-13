import { createError } from "../error.js";
import Chat from "../models/Chat.js";


export const addChat = async (req, res, next) => {
    try {
        const found = await Chat.findOne({$or: [
            {user1 : req.body.user1, user2: req.body.user2},
            {user2 : req.body.user1, user1: req.body.user2}
        ]})
        if (!found){
            const newChat = new Chat({...req.body});
            const chat = await newChat.save()
            return res.status(200).json(chat)
        }
        return res.status(200).json(found)
        
    } catch (error) {
        next(error)
    }
}

export const updateMessages = async(req, res, next) => {
    try {
        await Chat.findByIdAndUpdate(req.params.id, {
            $push: {messages: req.body.message}
        });
        res.status(200).send("The Chat is updated")
    } catch (error) {
        next(error)
    }
}
export const getPrivate = async (req, res, next) => {
    try {
        const chats = await Chat.find({
          $or: [
            {user1: req.params.id},
            {user2: req.params.id}
          ]
        })
        res.status(200).json(chats.map((chat) => chat._id))
      } catch (error) {
        next(error)
      }
}

export const getMessages = async (req, res, next) => {
    try {
      
        const chat = await Chat.findById(req.params.id);
        res.status(200).json(chat)
    } catch (error) {
        next(error)
    }
}
export const lastMassage = async (req, res) => {
    try {
        const foundedChat = await Chat.findOne({$or: [
            {user1 : req.body.user1, user2: req.body.user2},
            {user2 : req.body.user1, user1: req.body.user2}
        ]})
        res.status(200).json(foundedChat.messages[foundedChat.messages.length - 1])
    } catch (error) {
        next(error)
    }   
}