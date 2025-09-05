import {AsyncController} from "../types/types";
import {loginUser, registerUser} from "../services/auth";

export const registerController:AsyncController = async(req, res, next)=>{
    await registerUser(req.body)
    res.json({
        status: 201,
        message: 'User was successfully registered',
    })
}

export const loginController: AsyncController = async(req, res, next)=>{
        const {accessToken} = await loginUser(req.body)
        res.json({
            status: 200,
            message: 'Login is successful',
            accessToken
        })
}