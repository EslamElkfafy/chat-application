import User from "./User.js";
import mongoose from "mongoose";

export default User.discriminator('Admin', mongoose.Schema({
    role: {
        type: String,
        default: "admin"
    }
}))