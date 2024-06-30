import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema(
  {
    value: {
      type: Boolean,
      default: false
    },
    like: {
      type: Number,
      default: 0
    }
  }
)
const buildOption = (like) => ({
  type: OptionSchema,
  default: {
    value: false,
    like
  }})
const OptionsSchema = new mongoose.Schema(
  {
    sendPrivate: buildOption(300),
    sendBlog: buildOption(400),
    sendAd: buildOption(Infinity),
    createRoom: buildOption(1000),
    changePhoto: buildOption(200)
  }
)
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
    tokens: {
      type: [String]
    },
    deptureTime: {
      type: Number
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
      default: null
    },
    fontSize: {
      type: String,
      default: "16px"
    },
    img: {
      type: String,
      default: "uploads/avatar.jpg"
    },
    private : {
      type: [String]
    },
    like: {
      type: Number
    },
    block: {
      type: [String]
    },
    chatBlock: {
      type: Boolean,
      default: false
    },
    infoBlock: {
      type: Boolean,
      default: false
    },
    option: OptionsSchema,
    country: {
      type: String,
      default: ""
    },
    room: {
      type: mongoose.Types.ObjectId,
      ref: "room"
    }
  },
  { timestamps: true }
);
UserSchema.pre('save', async function(next) {
  if (this.isModified('like'))
  {
    this.like
  }
  next()
})
export default mongoose.model("User", UserSchema);
