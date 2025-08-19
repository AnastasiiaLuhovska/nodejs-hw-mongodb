import {getContacts, getContactsById} from "../services/contacts";
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

export const postContactController = () => {

};
// export const DeleteContactController = () => {
//
// };
//
// export const PatchContactController = () => {
//
// };