import {NextFunction, Request, Response} from "express";
import {isValidObjectId} from "mongoose";
import createHttpError from "http-errors";

export const validateId = (req:Request, res:Response, next:NextFunction)=>{
    const {contactId} = req.params
    if(!isValidObjectId(contactId)){
     next(createHttpError(400, 'Bad Request'))
        return
    }
    next()
}