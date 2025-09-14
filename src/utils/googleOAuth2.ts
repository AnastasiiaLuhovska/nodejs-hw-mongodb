import {OAuth2Client} from "google-auth-library";
import {getEnvVar} from "./getEnvVar";
import {create} from "handlebars";
import createHttpError from "http-errors";

const clientId = getEnvVar('GOOGLE_CLIENT_ID') as string
const clientSecret = getEnvVar('GOOGLE_CLIENT_SECRET') as string
const redirectUri = getEnvVar('GOOGLE_REDIRECT_URL') as string

export const googleOAuthClient = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri
})

export const generateOAuthUrl = ()=> googleOAuthClient.generateAuthUrl({
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]
})

export const validateOAuthCode = async (code)=> {
   const response = await googleOAuthClient.getToken(code)
    if(!response.tokens.id_token){
        throw createHttpError(401, 'ID token not received from Google')
    }
    const ticket = await googleOAuthClient.verifyIdToken({
        idToken: response.tokens.id_token
    })
    return ticket
}

export const getGoogleName = payload =>{
    if(payload.name) return payload.name
    if(!payload.family_name && !payload.given_name) return 'Guest'
    let name = ""
    if(payload.given_name){
        name += payload.given_name
    }
    if(payload.family_name){
        name += payload.family_name
    }
    return name

}
