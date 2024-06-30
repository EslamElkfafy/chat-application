import mongoose from "mongoose";

const sequenceSchema = mongoose.Schema({
    _id: String,
    count: {
        type: Number,
        default: 0
    },
    prefix: {
        type: String,
        default: ''
    },
    postfix: {
        type: String,
        default: ''
    }
}, {
    _id: false
})

export default mongoose.model('Sequence', sequenceSchema)