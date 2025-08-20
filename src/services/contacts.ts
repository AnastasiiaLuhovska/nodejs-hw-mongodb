import ContactCollection from "../db/models/model";
import {GetContacts, GetContactsById, PostContact} from "../types/types";

export const getContactsById:GetContactsById = async(contactId) => {
    const data = await ContactCollection.findById(contactId)
    return data

}

export const getContacts:GetContacts = async() => {
    const data = await ContactCollection.find()
    return data

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