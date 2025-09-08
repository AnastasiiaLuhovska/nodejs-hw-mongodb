import {Router} from "express";
import {validateBody} from "../middlewares/validateBody";
import {validationSchemaLogin, validationSchemaRegister} from "../validation/users";
import {
    loginController,
    logoutController,
    refreshController,
    registerController,
    requestResetEmailController, resetPassController
} from "../controllers/authControllers";
import ctrlWrapper from "../utils/ctrlWrapper";
import {requestResetSchema} from "../validation/requestResetEmail";
import {resetPassSchema} from "../validation/resetPass";

const authRouter = Router()

authRouter.post('/auth/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))
authRouter.post('/auth/login', validateBody(validationSchemaLogin), ctrlWrapper(loginController))
authRouter.post('/auth/refresh', ctrlWrapper(refreshController))
authRouter.post('/auth/logout', ctrlWrapper(logoutController))
authRouter.post('/auth/request-reset-email', validateBody(requestResetSchema), ctrlWrapper(requestResetEmailController))
authRouter.post('/auth/reset-pass', validateBody(resetPassSchema), ctrlWrapper(resetPassController))

export default authRouter