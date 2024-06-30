import Room from "../models/Room.js";
import Sequence from "../models/Sequence.js"

export const addRoom = async (req, res) => {
    try{
        let room = new Room({...req.body})
        await room.save()
        res.status(200).json({
            state: "success",
            message: "تم اضافة الغرفة بنجاح",
            payload: room
        })
    } catch(e) {
        const error = []
        if (e.errors)
        {
            Object.keys(e.errors).forEach(er => {
                error.push(e.errors[er].message)
            });
        }
        else if (e.code && e.code === 11000)
        {
            error.push("هذا الاسم موجود بالفعل")
        }
        res.status(500).json({
            state: "fail",
            message: "",
            payload: error
        })
    }
}
export const getRoom = async (req, res, next) => {
    try {
        let room = await Room.findById(req.params.id)
        res.status(200).json({
            state: "success",
            message: "تم ايجاد الغرفة",
            payload: room
        })
    } catch(e) {
        next(e)
    }
}
export const getAllRooms = async (req, res, next) => {
    try {
        let rooms = await Room.find()
        res.status(200).json({
            state: "success",
            message: "تم ايجاد الغرف",
            payload: rooms
        })
    } catch(e) {
        next(e)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        let room = await Room.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({
            state: "success",
            message: "تم حفظ التغييرات",
            payload: room
        })
    } catch(e) {
        next(e)
    }
}
