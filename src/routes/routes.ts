import {Router} from "express";
import {
    deleteContactController,
    getContactBytIdController,
    getContactController, patchContactController,
    postContactController
} from "../controllers/contactControllers";
import ctrlWrapper from "../utils/ctrlWrapper";
import {validateBody} from "../middlewares/validateBody";
import {validationSchemaContact, validationUpdateContact} from "../validation/contacts";
import {validateId} from "../middlewares/validateId";

const router = Router()

router.get('/contacts', ctrlWrapper(getContactController))
router.get('/contacts/:contactId', validateId, ctrlWrapper(getContactBytIdController))
router.post('/contacts', validateBody(validationSchemaContact), ctrlWrapper(postContactController))
router.delete('/contacts/:contactId', validateId, ctrlWrapper(deleteContactController))
router.patch('/contacts/:contactId', validateId, validateBody(validationUpdateContact), ctrlWrapper(patchContactController))
export default router