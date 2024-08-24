import Record from "../models/Record.js";

export const addRecord = async ( req, res, next) => {
    try {
        const newRecord = new Record({...req.body});
        newRecord.save();
        res.status(200).json("add new record");
    } catch ( err ) {
        next(err);
    }
}

export const getRecords = async (req, res, next) => {
    try {
        const records = await Record.find({});
        res.status(200).json(records);
    } catch ( err ) {
        next(err);
    }
}