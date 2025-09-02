import {SORT_KEYS, SORT_ORDER} from "../constants/constants";

export const parseSortParams = (query)=>{
    const {sortBy, sortOrder} = query
    const parsedSortBy = parseSortBy(sortBy)
    const parsedSortOrder = parseSortOrder(sortOrder)
    return {
        parsedSortBy,
        parsedSortOrder
    }
}

const parseSortBy = (sortBy:any):string=>{
        if(!SORT_KEYS.includes(sortBy)) return '_id'
        return sortBy
}

const parseSortOrder = (sortOrder:any):'asc' | 'desc' =>{
        if(![SORT_ORDER.asc, SORT_ORDER.desc].includes(sortOrder)) return 'asc'
        return sortOrder
}