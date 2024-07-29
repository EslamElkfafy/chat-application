import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export default {
    signup: async (entity, Model=User) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(entity.password, salt);
        const newUser = new Model({ ...entity, password: hash });

        return await newUser.save();
    }
}