import {AsyncController} from "../types/types";
import {
    loginUser, loginWIthGoogle,
    logOutUser,
    refreshSession,
    registerUser,
    requestResetEmail,
    resetPassword,
    setupCookies
} from "../services/auth";
import {generateOAuthUrl} from "../utils/googleOAuth2";

export const registerController:AsyncController = async(req, res, next)=>{
    const {name, email} = await registerUser(req.body)
    res.status(201).json({
        status: 201,
        message: 'User was successfully registered',
        data : {name, email}
    })
}

export const loginController: AsyncController = async(req, res, next)=>{
        const {accessToken, refreshToken, _id, refreshValidUntil} = await loginUser(req.body)

        setupCookies(refreshToken, _id, refreshValidUntil, res)
        res.json({
            status: 200,
            message: 'Login is successful',
            data:{
                accessToken
            }
        })
}

export const refreshController:AsyncController = async(req, res, next)=>{
        const sessionId= req.cookies.sid
        const oldRefreshToken = req.cookies.refreshToken
    const {accessToken, refreshToken, _id, refreshValidUntil}  = await refreshSession(sessionId, oldRefreshToken)

    setupCookies(refreshToken, _id, refreshValidUntil, res)

    res.status(201).json({
        status: 201,
        message: 'Token is successfully refreshed',
        accessToken
    })

}

export const logoutController:AsyncController = async(req, res, next)=>{
    const sessionId= req.cookies.sid
    if(sessionId) {
        await logOutUser(sessionId)
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send()
}

export const requestResetEmailController:AsyncController = async(req, res, next)=>{
    await requestResetEmail(req.body)
    res.json({
        status:200,
        message: 'Reset email was sent successfully'
    })
}

export const resetPassController:AsyncController = async(req, res, next)=>{
    await resetPassword(req.body)
    res.json({
        status:200,
        message: 'Password was successfully updated'
    })
}

export const getGoogleOauthController = async(req, res, next)=>{
    const url = generateOAuthUrl()
    res.json({
        status: 200,
        message: 'Google OAuth url was successfully generated',
        data:{
            url
        }
    })
}

export const loginWithGoogleOAuthController = async(req, res, next) =>{
    const {refreshToken,  _id, refreshValidUntil, accessToken} = await loginWIthGoogle(req.body)
    setupCookies(refreshToken, _id, refreshValidUntil, res)
    res.json({
        status: 200,
        message: 'Login is successful',
        data:{
            accessToken
        }
    })
}