import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    user1Id: {
        type: mongoose.Types.ObjectId,
    },
    user2Id: {
        type: mongoose.Types.ObjectId,
    },
    roomId: {
        type: mongoose.Types.ObjectId,
    }
  },
  { timestamps: true }
);
export default mongoose.model("status", statusSchema);
