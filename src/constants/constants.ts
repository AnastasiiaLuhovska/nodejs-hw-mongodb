export const SORT_ORDER = {
    asc: 'asc',
    desc: 'desc'
}



export const SORT_KEYS = ['_id', 'name', 'isFavourite', 'createdAt', 'updatedAt']

export const FILTER_KEYS = {
    contactType: 'enum',
    isFavourite: 'boolean'
}

export const ENUM_VALUES = ['personal', 'home', 'work']

export const emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

export const FIFTEEN_MIN = 15*60*1000
export const ONE_DAY     = 24*60*60*1000
