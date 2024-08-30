import {addAdmin} from "../controllers/user.js"
import {Router} from "express"

const router = Router()

router.post("/", addAdmin)

export default router