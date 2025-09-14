import ContactCollection from "../db/models/contact";
import {GetContacts, GetContactsById, PostContact} from "../types/types";
import {calculatePaginationData} from "../utils/calculatePaginationData";
import {saveFileToPublic} from "../utils/saveFileToPublic";
import {saveToCloudinary} from "../utils/saveToClaudinary";

export const getContactsById:GetContactsById = async(contactId, user) => {
    const data = await ContactCollection.findOne({_id:contactId, userId: user._id})
    return data

}

export const getContacts:GetContacts = async({parsedPage, parsedPerPage, parsedSortBy, parsedSortOrder, filters, userId}) => {
    const skip = (parsedPage - 1)*parsedPerPage
    const contactQuery = ContactCollection.find({userId})

    Object.entries(filters).forEach(([key, value])=> contactQuery.where(key).equals(value))

    const contactCount = await ContactCollection.find().merge(contactQuery).countDocuments()
    const paginationData = calculatePaginationData(contactCount, parsedPage, parsedPerPage)

    const data = await contactQuery.limit(parsedPerPage).skip(skip).sort({[parsedSortBy]:parsedSortOrder}).exec()

    return {data,
        ...paginationData}

}

export const postContact:PostContact = async(contact, user, file)=>{
    let photo
    if(file) {
        if (process.env.CLOUDINARY_ENABLED) {
            photo = await saveToCloudinary(file)
        } else {
            if (file) {
                photo = await saveFileToPublic(file)
            }
        }
    }
    const data = await ContactCollection.create({...contact, userId: user._id, ...(photo&& {photo})})
    return data
}

export const deleteContact = async(contactId, user)=>{
    const data = await ContactCollection.findOneAndDelete({_id: contactId, userId: user._id})
    return data
}

export const updateContact = async(contactId, user, contact, file) =>{
    let photo
    if(file) {
        if (process.env.CLOUDINARY_ENABLED) {
            photo = await saveToCloudinary(file)
        } else {
            if (file) {
                photo = await saveFileToPublic(file)
            }
        }
    }

    const data = await ContactCollection.findOneAndUpdate({_id: contactId, userId: user._id}, {...contact, ...(photo&& {photo})}, {    new: true,
        includeResultMetadata: true})
    console.log(data)
    return data
}