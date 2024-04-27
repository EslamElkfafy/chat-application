import mongoose from "mongoose";

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
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
