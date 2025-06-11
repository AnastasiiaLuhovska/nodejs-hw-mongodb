import ContactCollection from "../db/models/model";
import {GetContacts, GetContactsById} from "../types/types";

export const getContactsById:GetContactsById = async(contactId) => {
    const data = await ContactCollection.findById(contactId)
    return data

}

export const getContacts:GetContacts = async() => {
    const data = await ContactCollection.find()
    return data

}