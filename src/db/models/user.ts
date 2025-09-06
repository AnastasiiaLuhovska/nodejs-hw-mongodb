import mongoose, {Schema} from "mongoose";
import {emailRegexp} from "../../constants/constants";
import {CustomError} from "../../types/types";
import {NextFunction} from "express";

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
    { timestamps: true})

schema.post('save', (error:CustomError, doc, next:NextFunction)=>{
        error.status = 400
    next()
})

export const UserCollection = mongoose.model('user', schema)