import {deleteContact, getContacts, getContactsById, postContact, updateContact} from "../services/contacts";
import {AsyncController} from "../types/types";
import createHttpError from "http-errors";

export const getContactController:AsyncController = async(req, res, next) => {
   const data = await getContacts()
   res.json({
       status: 200,
       message: "Contact were found successfully",
       data: data
   })
};

export const getContactBytIdController:AsyncController = async(req, res, next)=>{
    const data = await getContactsById(req.params.contactId)
    if(!data){
        next(createHttpError(404, 'Contact was not found'))
        return
    }
    res.json({
        status: 200,
        message: 'Contact was found successfully',
        data
    })
}

export const postContactController = async(req, res, next) => {
        const data = await postContact(req.body)
        res.status(201).json({
            status: 201,
            message: 'Contact was successfully created',
            data

        })
};
export const deleteContactController = async(req, res, next) => {
        const data = await deleteContact(req.params.contactId)

        if(!data){
            next(createHttpError(404, 'Contact was not found'))
            return
        }
        res.json({
            status: 200,
            message: 'Contact was successfully deleted',
            data
        })
};

export const patchContactController = async(req, res, next) => {
    const data = await updateContact(req.params.contactId, req.body)
    if(!data){
        next(createHttpError(404, 'Contact was not found'))
        return
    }
    res.json({
        status: 200,
        message: 'Contact was updated successfully',
        data: data.value
    })
};