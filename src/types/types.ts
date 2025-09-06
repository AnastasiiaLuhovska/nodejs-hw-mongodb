import {NextFunction, Request, Response} from "express";
import {Types, Document} from "mongoose";

export interface CustomError extends Error {
    status?: number;
}

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
    },
    userId: Types.ObjectId

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
    (contactId:string, user:User):Promise<IContact>
}
export interface AsyncController{
    (req:RequestWithUserData, res:Response, next:NextFunction): Promise<void>
}
export interface Contact extends IContact{
    _id: Types.ObjectId
}

export interface PostContact{
    (IContact, User): Promise<Contact>
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

export interface SessionData extends Document{
        _id: Types.ObjectId,
         userId: Types.ObjectId
        accessToken: string,
        refreshToken: string,
        accessValidUntil: Date,
        refreshValidUntil: Date
}

export interface User extends UserWithoutId{
    _id: Types.ObjectId
}

export interface UserWithoutId{
    name: string,
    email: string,
    password: string
}
export interface RequestWithUserData extends Request{
    user: User
}