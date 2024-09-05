import axios from "axios";
import Room from "../lib/Room";
import UserRepository from "./userRepository";

export default class RoomRepository {
    static async getAllRooms() : Promise<Room[]>{
        const response = await axios.get("rooms/")
        await Promise.all(response.data.payload.map(async (room: Room) => {
            room.userName = (await UserRepository.getById(room.userId)).userName
        }))
        return response.data.payload
    }
    static async getById(id: string) : Promise<Room> {
        const response = await axios.get("rooms/" + id)
        response.data.payload.userName = (await UserRepository.getById(response.data.payload.userId)).userName
        return response.data.payload
    }
    static async deleteById(id: string) : Promise<void> {
        await axios.delete("rooms/" + id)
    }
    static async updateById(room: Room) : Promise<void> {
        const response = await axios.put("rooms/" + room._id, room)
        console.log(response.data)
    }
}