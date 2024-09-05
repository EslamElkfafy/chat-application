import axios from "axios";
import Status from "../lib/Status";
import UserRepository from "./userRepository";
import RoomRepository from "./roomRepository";

export default class StatusRepository {
    static async getAll(): Promise<Status[]> {
        const statusRecords = (await axios.get("status/")).data
        await Promise.all(statusRecords.map(async (statusRecord: Status) => {
            statusRecord.user1Name = (await UserRepository.getById(statusRecord.user1Id)).userName
            statusRecord.user2Name = (await UserRepository.getById(statusRecord.user2Id)).userName
            statusRecord.roomName = (await RoomRepository.getById(statusRecord.roomId)).name
        }))
        return statusRecords
    }
    static async add(status: Status): Promise<void> {
        await axios.post("status", status)
    }
}