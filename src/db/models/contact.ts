import mongoose, {Schema} from "mongoose";
import {CustomError, IContactWithTimestamps} from "../../types/types";
import {NextFunction} from "express";


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: false
    },
    contactType: {
        type: String,
        enum: ['personal', 'home', 'work'],
        default: 'personal',
        required: true
    }
},  {
    timestamps: true
})

schema.post('save', (error:CustomError, doc, next:NextFunction)=>{
    error.status = 400
    next()
})
schema.pre('findOneAndUpdate', function( doc, next:NextFunction){
    this.setOptions({
        runValidators: true
    })
    next()
})

const ContactCollection = mongoose.model<IContactWithTimestamps>('Contact', schema)

export default ContactCollection