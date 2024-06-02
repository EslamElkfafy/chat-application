import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    description: String,
    helloMessage: String,
    password: String,
    likes: Number,
    visitors: Number,
    mics: {
      type: Number,
      max: [99, "عدد الصوتيات يجب الا تتعدي 99 مايك"]
    },
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
export default mongoose.model("room", PostSchema);
