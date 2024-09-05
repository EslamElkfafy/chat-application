import axios from "axios";
import User from "../lib/User";

export default class UserRepository {
    static async getById(userId: string): Promise<User>
    {
        const response = await axios.get("users/find/" + userId)
        return response.data
    }
    static async update(user: User) : Promise<void> {
        await axios.put("users/" + user._id, user)
    }
    static async deleteById(userId: string) : Promise<void> {
        await axios.delete("users/" + userId)
    }
}