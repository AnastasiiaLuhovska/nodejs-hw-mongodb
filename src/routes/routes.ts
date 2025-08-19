import {Router} from "express";
import {
    getContactBytIdController,
    getContactController,
    postContactController
} from "../controllers/contactControllers";
import ctrlWrapper from "../utils/ctrlWrapper";

const router = Router()

router.get('/contacts', ctrlWrapper(getContactController))
router.get('/contacts/:contactId', ctrlWrapper(getContactBytIdController))
router.post('/contacts', ctrlWrapper(postContactController))

export default router