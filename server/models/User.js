import mongoose from "mongoose";
import Room from "./Room.js"
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
      type: Number,
      default: 0
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
      ref: "room",
      default: null
    },
    role: {
      type: String, 
      default: 'member',
    },
    ip: {
      type: String,
      default: "0.0.0.0"
    },
    device: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);
const micConfig = async (user, next) => {
  try {
    const room = await Room.findById(user.room)
    room.placesOfVoices[room.placesOfVoices.indexOf(user._id)] = ''
    await room.save()
  } catch(e) {
    next(e.message)
  }
}
UserSchema.pre('findOneAndUpdate', function (next) {
  if (this.getUpdate().$set.room && this.getQuery()._id)
    micConfig({...this.getUpdate().$set, ...this.getQuery()}, next)
  next()
})
export default mongoose.model("User", UserSchema);
