import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        require: true
    },
    url: {
        type: String
    },
    type: {
        type: String
    },
    like: {
        type: [String]
    },
    text: {
      type: String
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
          arrivalTime: {
            type: Number
          }
        }
      ],
    arrivalTime: {
        type: Number
    }

  },
  { timestamps: true }
);
export default mongoose.model("Post", PostSchema);
