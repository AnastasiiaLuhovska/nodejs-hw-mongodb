import {Router} from "express";
import {validateBody} from "../middlewares/validateBody";
import {validationSchemaLogin, validationSchemaRegister} from "../validation/users";
import {loginController, logoutController, refreshController, registerController} from "../controllers/authControllers";
import ctrlWrapper from "../utils/ctrlWrapper";

const authRouter = Router()

authRouter.post('/auth/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))
authRouter.post('/auth/login', validateBody(validationSchemaLogin), ctrlWrapper(loginController))
authRouter.post('/auth/refresh', ctrlWrapper(refreshController))
authRouter.post('/auth/logout', ctrlWrapper(logoutController))

export default authRouter