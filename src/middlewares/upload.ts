import {TEMP_DIR} from "../constants/constants";
import multer from 'multer'
import createHttpError from "http-errors";

const storage = multer.diskStorage({
    destination: TEMP_DIR,
    filename: (req, file, cd)=>{
        const uniquePrefix = Date.now();
        cd(null, `${uniquePrefix}_${file.originalname}`)
    }
})

const limits = {
    fileSize: 1024*1024*5
}

const fileFilter = (req, file, cd) =>{
    if(file.originalname.split('').pop() === 'exe'){
        return cd(createHttpError(400, '.exe extension is not allowed'))
    }else{
        cd(null, true)
    }
}
export const upload = multer({
    storage,
    limits,
    fileFilter
})