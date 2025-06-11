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