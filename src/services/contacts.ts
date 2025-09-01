import ContactCollection from "../db/models/model";
import {GetContacts, GetContactsById, PostContact} from "../types/types";
import {calculatePaginationData} from "../utils/calculatePaginationData";

export const getContactsById:GetContactsById = async(contactId) => {
    const data = await ContactCollection.findById(contactId)
    return data

}

export const getContacts:GetContacts = async({parsedPage, parsedPerPage}) => {
    const skip = (parsedPage - 1)*parsedPerPage
    const contactQuery = ContactCollection.find()
    const contactCount = await ContactCollection.find().merge(contactQuery).countDocuments()

    const paginationData = calculatePaginationData(contactCount, parsedPage, parsedPerPage)

    const data = await contactQuery.find().limit(parsedPerPage).skip(skip)

    return {data,
        ...paginationData}

}

export const postContact:PostContact = async(contact)=>{
    const data = await ContactCollection.create(contact)
    return data
}

export const deleteContact = async(contactId)=>{
    const data = await ContactCollection.findOneAndDelete({_id: contactId})
    return data
}

export const updateContact = async(contactId, contact) =>{
    const data = await ContactCollection.findByIdAndUpdate({_id: contactId}, contact, {    new: true,
        includeResultMetadata: true})
    return data
}