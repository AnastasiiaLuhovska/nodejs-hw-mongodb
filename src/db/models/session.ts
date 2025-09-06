import mongoose, {Schema, Types} from "mongoose";
import {SessionData} from "../../types/types";

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'users'
    },
    accessToken:{
        type: String,
        required: true
    },
    refreshToken:{
        type: String,
        required: true
    },
    accessValidUntil:{
        type: Date,
        required: true
    },
    refreshValidUntil:{
        type: Date,
        required: true
    }
})

export const SessionCollection = mongoose.model<SessionData>('session', schema)