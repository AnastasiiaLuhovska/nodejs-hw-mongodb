import {CalculateFunc} from "../types/types";

export const calculatePaginationData:CalculateFunc = (contactCount, parsedPage, parsedPerPage)=>{
 const totalPages = Math.ceil(contactCount/parsedPerPage)
    const hasNext = parsedPage < totalPages
    const hasPrevious = parsedPage > 1
    return {
        totalPages,
        hasNext,
        hasPrevious,
        page: parsedPage,
        perPage: parsedPerPage,
        totalContacts: contactCount

    }
}