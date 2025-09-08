import {UserCollection} from "../db/models/user";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import {SessionCollection} from "../db/models/session";
import {randomBytes} from "crypto";
import {FIFTEEN_MIN, ONE_DAY, TEMPLATES_PATH} from "../constants/constants";
import {Types} from "mongoose";
import {UserWithoutId} from "../types/types";
import {Response} from "express";
import {getEnvVar} from "../utils/getEnvVar";
import {sendMail} from "../utils/sendMail";
import jwt, {JwtPayload} from 'jsonwebtoken'
import fs from 'fs/promises';
import * as path from "node:path";
import * as handlebars from "handlebars";

export const registerUser = async(userData:UserWithoutId)=>{
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
export const loginUser = async (userData:UserWithoutId) => {
    const user = await UserCollection.findOne({email: userData.email})
    if (!user) throw createHttpError(401, 'User is not found')
    const isEqual = await bcrypt.compare(userData.password, user.password)
    if (!isEqual) throw createHttpError(401, 'User is not found')
    return await createSession(user._id)



}

export const refreshSession = async(sessionId:Types.ObjectId, refreshToken:string)=>{
    const session = await SessionCollection.findOne({_id:sessionId, refreshToken})
    if(!session) throw createHttpError(401, 'Session doesnt exist')

    if(session.refreshValidUntil < new Date()) throw createHttpError(401, 'Refresh Token is expired')

    const oldSession = await SessionCollection.findOneAndDelete({_id:sessionId, refreshToken})

    return await createSession(oldSession.userId)

}

export const setupCookies = (refreshToken:string, sessionId:Types.ObjectId, refreshValidUntil:Date, res:Response) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly:true,
        expires: refreshValidUntil
    })
    res.cookie('sid', sessionId, {
        httpOnly:true,
        expires: refreshValidUntil
    })
}

export const logOutUser = async(sessionId)=>{
    await SessionCollection.deleteOne({_id: sessionId})
}

export const requestResetEmail = async({email}) =>{
    const user = await UserCollection.findOne({email})
    if(!user) throw createHttpError(404, `User ${email} was not found`)
    const secret = process.env['JWT_SECRET']

    const resetToken = jwt.sign({email}, secret, {expiresIn: '1h'})

    const templateSource = await fs.readFile(path.join(TEMPLATES_PATH, 'resetPass.html'))
    const template = handlebars.compile(templateSource.toString())
    const html = template({
        resetToken
    })
    await sendMail({
        from: getEnvVar('BREVO_FROM'),
        to: 'forag92643@cspaus.com',
        subject: 'test',
        html
    })

}

export const resetPassword = async({password, token})=>{
    let payload
    try{
        const secret = process.env['JWT_SECRET']
        payload = jwt.verify(token, secret) as JwtPayload

    }catch(e){
        throw createHttpError(401, e.message)
    }


    const user = await UserCollection.findOne({email: payload.email})
    if(!user) throw createHttpError(404, 'User was not found')

    const hashedPass = await bcrypt.hash(password, 10)

    await UserCollection.findOneAndUpdate({email:payload.email}, {password:hashedPass})
}