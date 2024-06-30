import Room from "./Room.js";
import mongoose from "mongoose";

export default Room.discriminator('General', new mongoose.Schema({
    type: {
        type: String,
        default: "general",
        immutable: true
    }
}))