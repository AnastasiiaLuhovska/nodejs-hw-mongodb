import {Router} from "express";
import {validateBody} from "../middlewares/validateBody";
import {validationSchemaLogin, validationSchemaRegister} from "../validation/users";
import {loginController, registerController} from "../controllers/authControllers";
import ctrlWrapper from "../utils/ctrlWrapper";

const authRouter = Router()

authRouter.get('/auth/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))
authRouter.get('/auth/login', validateBody(validationSchemaLogin), ctrlWrapper(loginController))
export default authRouter