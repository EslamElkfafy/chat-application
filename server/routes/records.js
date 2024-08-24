import express from "express";
import { addRecord, getRecords } from "../controllers/record.js";

const router = express.Router();

router.post('/addrecord', addRecord)
router.get('/getall', getRecords);

export default router;
 