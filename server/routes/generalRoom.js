import {
    find,
    add,
    addManual
} from "../controllers/generalRoom.js"
import {Router} from "express"

const router = Router()

router.get("/", find)
router.post("/", add)
router.post("/addManual", addManual)
export default router