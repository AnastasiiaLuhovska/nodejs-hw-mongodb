import mongoose, {Schema} from "mongoose";
import {emailRegexp} from "../../constants/constants";

const schema = new Schema({
     name:{
         type: String,
         required: true
     },
    email:{
        type: String,
        match: emailRegexp,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
    }
},
    { timestamps: true,  versionKey:false})

export const UserCollection = mongoose.model('user', schema)