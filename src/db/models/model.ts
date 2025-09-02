import mongoose, {Schema} from "mongoose";
import { IContactWithTimestamps} from "../../types/types";


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

const ContactCollection = mongoose.model<IContactWithTimestamps>('Contact', schema)

export default ContactCollection