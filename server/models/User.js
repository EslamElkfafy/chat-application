import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "بلا اسم"
    },
    socketId: {
      type: String,
    },
    password: {
      type: String,
    },
    state: {
      type: String,
      default: "عضو جديد",
    },
    status: {
      type: String,
    },
    nameColor: {
      type: String,
      default: "#000000"
    },
    fontColor: {
      type: String,
      default: "#000000"
    },
    backgroundColor :{
      type: String,
      default: "#dbeafe"
    },
    fontSize: {
      type: String,
      default: "16px"
    },
    img: {
      type: String,
      default: "/avatar.jpg"
    },
    private : {
      type: [String]
    },
    like: {
      type: [String]
    },
    block: {
      type: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
