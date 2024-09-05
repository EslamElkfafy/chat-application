import { 
    addRoom, 
    getRoom, 
    getAllRooms, 
    updateRoom,
    deleteRoom
} from "../controllers/room.js";
import express from "express"

const router = express.Router()

router.get("/", getAllRooms)
router.get("/:id", getRoom)
router.post("/", addRoom)
router.put("/:id", updateRoom)
router.delete("/:id", deleteRoom)
export default router