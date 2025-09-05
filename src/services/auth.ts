import {UserCollection} from "../db/models/user";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import {SessionCollection} from "../db/models/session";
import {randomBytes} from "crypto";
import {FIFTEEN_MIN, ONE_DAY} from "../constants/constants";
import {Types, Document} from "mongoose";


export const registerUser = async(userData)=>{
    const user = await UserCollection.findOne({email: userData.email})
    if(user){
        throw createHttpError(409, 'User with this email already exists')
    }

    const password = await bcrypt.hash(userData.password, 10)

   await UserCollection.create({...userData, password})
}

const createSession = async (userId:Types.ObjectId)=> {
    await SessionCollection.deleteOne({userId})

    const accessToken = randomBytes(30).toString('base64')
    const refreshToken = randomBytes(30).toString('base64')
    const accessValidUntil = new Date(Date.now() + FIFTEEN_MIN)
    const refreshValidUntil = new Date(Date.now() + ONE_DAY)

   return await SessionCollection.create(
        {
            userId,
            accessToken,
            refreshToken,
            accessValidUntil,
            refreshValidUntil
        })

}
export const loginUser = async (userData) => {
    const user = await UserCollection.findOne({email: userData.email})
    if (!user) throw createHttpError(401, 'User is not found')
    const isEqual = await bcrypt.compare(userData.password, user.password)
    if (!isEqual) throw createHttpError(401, 'User is not found')
    return await createSession(user['_id'])

}

