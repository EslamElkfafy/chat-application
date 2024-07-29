import User from "./User.js";
import mongoose from "mongoose";

export default User.discriminator('Guest', mongoose.Schema({
    role: {
        type: String, 
        default: 'guest',
    },
    password: {
        type: String,
        default: 123
    }
}))