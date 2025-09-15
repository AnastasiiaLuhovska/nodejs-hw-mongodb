import {Router} from "express";
import {validateBody} from "../middlewares/validateBody";
import {validationSchemaLogin, validationSchemaRegister} from "../validation/users";
import {
    getGoogleOauthController,
    loginController, loginWithGoogleOAuthController,
    logoutController,
    refreshController,
    registerController,
    requestResetEmailController, resetPassController
} from "../controllers/authControllers";
import ctrlWrapper from "../utils/ctrlWrapper";
import {requestResetSchema} from "../validation/requestResetEmail";
import {resetPassSchema} from "../validation/resetPass";
import {googleOAuthSchema} from "../validation/googleOAuth";

const authRouter = Router()

authRouter.post('/auth/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))
authRouter.post('/auth/login', validateBody(validationSchemaLogin), ctrlWrapper(loginController))
authRouter.post('/auth/refresh', ctrlWrapper(refreshController))
authRouter.post('/auth/logout', ctrlWrapper(logoutController))
authRouter.post('/auth/send-reset-email', validateBody(requestResetSchema), ctrlWrapper(requestResetEmailController))
authRouter.post('/auth/reset-pwd', validateBody(resetPassSchema), ctrlWrapper(resetPassController))
authRouter.get('/auth/get-oauth-url', ctrlWrapper(getGoogleOauthController))
authRouter.post('/auth/confirm-oauth', validateBody(googleOAuthSchema), ctrlWrapper(loginWithGoogleOAuthController))
export default authRouter