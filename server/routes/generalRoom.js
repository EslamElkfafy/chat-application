import {
    find,
    add
} from "../controllers/generalRoom.js"
import {Router} from "express"

const router = Router()

router.get("/", find)
router.post("/", add)
export default router