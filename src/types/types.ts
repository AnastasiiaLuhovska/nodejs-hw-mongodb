import {NextFunction, Request, Response} from "express";
import {Types} from "mongoose";

// export interface CustomError extends Error {
//     status?: number;
//     statusCode?: number;
// }

export interface GetEnvVar {
    (name?:string, defaultValue?:number|string): string|number
}

export interface IContact {
    name: string;
    phoneNumber: string;
    email?: string;
    isFavourite?: boolean;
    contactType: 'personal' | 'home'| 'work';
}

export interface IContactWithTimestamps extends IContact {
    createdAt: Date;
    updatedAt: Date;
    _id: Types.ObjectId;
}

interface getContactsProps{
    parsedPage: number,
    parsedPerPage:number,
    parsedSortOrder: 'asc' | 'desc',
    parsedSortBy: string,
    filters: {
        [x: string]: number|boolean|string
    }

}
interface PaginationData {
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
    page: number,
    perPage: number,
    totalContacts: number
}

interface ContactsResponse extends PaginationData {
    data: IContactWithTimestamps[];
}
export interface GetContacts {
    (query:getContactsProps):Promise<ContactsResponse>
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

export interface CalculateFunc{
    (contactCount: number, parsedPage:number, parsedPerPage:number) : {
        totalPages:number,
        hasNext: boolean,
        hasPrevious:boolean,
        page: number,
        perPage: number,
        totalContacts: number

    }
}
