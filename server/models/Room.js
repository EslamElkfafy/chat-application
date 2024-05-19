import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    helloMessage: String,
    password: String,
    likes: Number,
    visitors: Number,
    mics: Number,
    voiceActive: {
      type: Boolean,
      default: false
    },
    withoutNotification: {
      type: Boolean,
      default: true
    },
    enterNotification: Boolean
  },
  { timestamps: true }
);
export default mongoose.model("Post", PostSchema);
