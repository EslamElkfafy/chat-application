import axios from "axios";
import Status from "../lib/Status";
import UserRepository from "./userRepository";
import RoomRepository from "./roomRepository";

export default class StatusRepository {
    static async getAll(): Promise<Status[]> {
        const statusRecords = (await axios.get("status/")).data
        // console.log(statusRecords);
        await Promise.all(statusRecords.map(async (statusRecord: Status) => {
            statusRecord.user1Name = (await UserRepository.getById(statusRecord.user1Id)).userName
            // console.log(statusRecord)
            statusRecord.user2Name = (await UserRepository.getById(statusRecord.user2Id)).userName
            statusRecord.roomName = (await RoomRepository.getById(statusRecord.roomId)).name
        }))
        console.log("fsdofjweoifjiowejfiowejfio")
        return statusRecords
    }
    static async add(status: Status): Promise<void> {
        await axios.post("status", status)
    }
}