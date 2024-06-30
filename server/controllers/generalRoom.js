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
        let room = new GeneralRoom({
            name: sequence.prefix + sequence.count + sequence.postfix,
            description: "غرفة عامة",
            helloMessage: "",
            visitors: 40,
        })
        room = await room.save()
        sequence.count += 1
        console.log(sequence)
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