import createHttpError from "http-errors";
import {SessionCollection} from "../db/models/session";
import {UserCollection} from "../db/models/user";

export const authentication = async(req, res, next) =>{
    const header = req.get('Authorization')
    if(!header) {
        next(createHttpError(401, 'Please provide Authorization header'))
        return
    }
    const accessToken = header.split(' ')[1]
    const bearer = header.split(' ')[0]

    if(bearer !== 'Bearer'){
        next(createHttpError(401, 'Authorization token should be in Bearer format'))
        return
    }
    const session = await SessionCollection.findOne({accessToken})
    if(!session){
        next(createHttpError(401, 'Session not found'))
        return
    }
    const user = await UserCollection.findOne({_id: session.userId})
    if(!user){
        next(createHttpError(401))
        return
    }
   const isValid = session.accessValidUntil > new Date()
    if(!isValid){
        next(createHttpError(401, 'Access token expired'))
        return
    }
    req.user = user
    next()
}