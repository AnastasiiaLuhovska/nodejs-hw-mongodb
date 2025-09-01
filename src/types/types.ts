import {NextFunction, Request, Response} from "express";
import {Types} from "mongoose";

export interface CustomError extends Error {
    status?: number;
    statusCode?: number;
}

export interface GetEnvVar {
    (name?:string, defaultValue?:number|string): string|number
}

export interface IContact {
    name: string;
    phoneNumber: string;
    email?: string;
    isFavourite: boolean;
    contactType: 'personal' | 'home'| 'work';
}

export interface GetContacts {
    ():Promise<IContact[]>
}

export interface GetContactsById {
    (contactId:string):Promise<IContact>
}
export interface AsyncController{
    (req:Request, res:Response, next:NextFunction): Promise<void>
}
export interface Contact extends IContact{
    _id: Types.ObjectId
}

export interface PostContact{
    (IContact): Promise<Contact>
}
