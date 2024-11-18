import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    permissions: [{
      type: String,
      enum: [
        'create-room', 
        'update-room', 
        'update-users', 
        'mute-user', 
        'update-likes', 
        'create-filter', 
        'subscriptions', 
        'shortcuts', 
        'messages',
        'supervise-filter',
        'jokes-detection',
        'control-panel',
        'full-room',
        'delete-user-image',
        'delete-general-messages',
        'hidden',
        'website-managemnt'
      ],
      default: ''
    }],
    staticRooms: {
      type: Number,
      default: 0
    },
    gifts: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
export default mongoose.model("Group", GroupSchema);
