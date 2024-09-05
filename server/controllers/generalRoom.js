import Admin from "../models/Admin.js"
import GeneralRoom from "../models/GeneralRoom.js"
import Sequence from "../models/Sequence.js"

export const find = async (req, res, next) => {
    try {
        const rooms = await GeneralRoom.find()
        res.status(200).json({
            state: "success",
            message: "تم ايجاد الغرف العامة",
            payload: rooms
        })
    } catch(e) {
        next(e)
    }
}

export const addManual = async (req, res, next) => {
    try {
        let sequence = ""
        if (!req.body.name) {
            sequence = await Sequence.findById("general")
            if (!sequence)
            {
                sequence = new Sequence({
                    _id: "general",
                    prefix: "الغرفة العامة (",
                    count: 1,
                    postfix: ")"
                })
                sequence = await sequence.save()
            }
        }
        let admin = await Admin.findOne()
        let room = new GeneralRoom({
            ...req.body,
        })
        if (!req.body.name) {
            room.name = sequence.prefix + sequence.count + sequence.postfix
        }
        if (!req.body.description) {
            room.description = "غرفة عامة"
        }
        if (!req.body.visitors) {
            room.visitors = 40
        }
        room.userId = admin._id
        room = await room.save()
        if (sequence)
        {
            sequence.count += 1
            await sequence.save()
        }
        res.status(200).json({
            state: "success",
            message:"تم اضافة غرفة عامة بنجاح",
            payload: room
        })
    } catch(e) {
        next(e)
    }
    
}
export const add = async (req, res, next) => {
    try {
        let sequence = await Sequence.findById("general")
        if (!sequence)
        {
            sequence = new Sequence({
                _id: "general",
                prefix: "الغرفة العامة (",
                count: 1,
                postfix: ")"
            })
            sequence = await sequence.save()
        }
        let admin = await Admin.findOne()
        let room = new GeneralRoom({
            name: sequence.prefix + sequence.count + sequence.postfix,
            description: "غرفة عامة",
            helloMessage: "",
            visitors: 40,
            userId: admin._id
        })
        room = await room.save()
        sequence.count += 1
        await sequence.save()
        res.status(200).json({
            state: "success",
            message:"تم اضافة غرفة عامة بنجاح",
            payload: room
        })
    } catch(e) {
        next(e)
    }
}