import mongoose from "mongoose";
import fs from 'fs';

const ChatSchema = new mongoose.Schema(
  {
    user1: {
      type: String,
      require: true
    },
    user2: {
      type: String,
      require: true
    },
    messages: [
      {
        userId: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        url: {
          type: String,
        },
        arrivalTime: {
          type: Date,
          required: true,
        }
      }
    ]
  },
  { timestamps: true }
);

ChatSchema.statics.deleteOne = async function (query) {
  try {
    const chat = await this.findOne(query)
    if (chat) {
      chat.messages.forEach(message => {
        if (message.url) {
          fs.unlinkSync(message.url)
        }
      });
      await this.findByIdAndDelete(chat._id)
    }
  } catch(e) {
    console.log(e)
  }
}
ChatSchema.statics.deleteMany = async function (query) {
  try {
    const chats = await this.find(query);
    if (chats.length > 0) {
      chats.forEach(async (chat) => {
        await this.deleteOne({
          _id: chat._id
        });
      });
    } 
  } catch(e) {
    console.log(e)
  }
}
export default mongoose.model("Chat", ChatSchema);
