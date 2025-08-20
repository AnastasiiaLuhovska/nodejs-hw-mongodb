import {Router} from "express";
import {
    deleteContactController,
    getContactBytIdController,
    getContactController, patchContactController,
    postContactController
} from "../controllers/contactControllers";
import ctrlWrapper from "../utils/ctrlWrapper";

const router = Router()

router.get('/contacts', ctrlWrapper(getContactController))
router.get('/contacts/:contactId', ctrlWrapper(getContactBytIdController))
router.post('/contacts', ctrlWrapper(postContactController))
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController))
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController))
export default router