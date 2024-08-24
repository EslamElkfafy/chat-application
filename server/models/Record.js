import mongoose from "mongoose";

const RecordSchema = mongoose.Schema(
    {
        role : {
            type: String,
            enum: ['member', 'guest', 'admin']
        }, 
        name : {
            type: String
        },
        userName : {
            type: String
        },
        ip : {
            type: String
        },
        country : {
            type: String
        },
        device : {
            type: String
        }
    }
)

export default mongoose.model('Record', RecordSchema);