import {Router} from "express";
import {validateBody} from "../middlewares/validateBody";
import {validationSchemaRegister} from "../validation/users";
import {loginController, registerController} from "../controllers/authControllers";
import ctrlWrapper from "../utils/ctrlWrapper";

const authRouter = Router()

authRouter.get('/auth/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))
authRouter.get('/auth/login', ctrlWrapper(loginController))
export default authRouter