import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export default {
    signup: async (entity, Model=User) => {
        const newUser = new Model({ ...entity });

        return await newUser.save();
    }
}