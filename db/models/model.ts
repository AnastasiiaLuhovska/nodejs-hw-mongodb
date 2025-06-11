import mongoose, {Schema} from "mongoose";
import {IContact} from "../../types/types";


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

    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: true
    },
    contactType: {
        type: String,
        enum: ['personal', 'home', 'work'],
        default: 'personal',
        required: true
    }
})

const ContactCollection = mongoose.model<IContact>('Contact', schema)

export default ContactCollection