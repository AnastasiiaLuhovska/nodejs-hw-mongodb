import {ENUM_VALUES, FILTER_KEYS} from "../constants/constants";
import {parseNumber} from "./parsePaginationParams";

const parseFilterByType = (value, type)=>{
     if(type === 'number'){
         return parseNumber(value, undefined)
     }
     if(type ==='boolean'){
         if (value === 'true') return true
         if (value === 'false') return false
     }
     if(type === 'enum'){
         return ENUM_VALUES.includes(value) && value
     }
}


export const parseFilterParams = (query)=>{

    const filters = Object.keys(query).reduce((acc, key) => {
        if(FILTER_KEYS[key]){
            const value = query[key]
            const type = FILTER_KEYS[key]
            return {...acc, ...{[key]: parseFilterByType(value, type)}}
        }
        return acc
    }, {} )
    return filters
}