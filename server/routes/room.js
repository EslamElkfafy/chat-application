import { 
    addRoom, 
    getRoom, 
    getAllRooms, 
    updateRoom,
} from "../controllers/room.js";
import express from "express"

const router = express.Router()

router.get("/", getAllRooms)
router.get("/:id", getRoom)
router.post("/", addRoom)
router.put("/:id", updateRoom)
export default router