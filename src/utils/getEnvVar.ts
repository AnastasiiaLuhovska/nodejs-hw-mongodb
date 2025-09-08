import 'dotenv/config'
import {GetEnvVar} from "../types/types";

export const getEnvVar:GetEnvVar = (name:string, defaultValue?:string|number)=>{
    const value = process.env[name]
    if(value) return value
    if(defaultValue) return defaultValue
    throw new Error(`Cannot find environment variable ${name} `)
}