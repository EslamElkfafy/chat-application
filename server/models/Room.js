import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    helloMessage: {
      type: String,
      default: ""
    },
    password: {
      type: String,
      default: ""
    },
    enterLikes: {
      type: Number,
      default: 0
    },
    micLikes: {
      type: Number,
      default: 0
    },
    visitors: {
      type: Number,
      max: [40, 'يجب الا يتعدى عدد الزوار 40 زائر'],
      default: 40
    },
    mics: {
      type: Number,
      default: 6
    },
    voiceActive: {
      type: Boolean,
      default: false
    },
    withoutNotification: {
      type: Boolean,
      default: false
    },
    enterNotification: {
      type: Boolean,
      default: false,
    },
    placesOfVoices: 
    {
      type: [String],
      default: ["", "", "", "", ""]
    },
    img: {
      type: String,
      default: "uploads/1600w-qJptouniZ0A.webp"
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
  },
  { timestamps: true }
);
export default mongoose.model("room", PostSchema);
