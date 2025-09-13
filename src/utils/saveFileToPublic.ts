import fs from "fs/promises";
import {PUBLIC_DIR} from "../constants/constants";
import createHttpError from "http-errors";
import * as path from "node:path";

export const saveFileToPublic = async file =>{
    console.log(file.path)
    try{
        await fs.rename(file.path, path.join(PUBLIC_DIR, file.filename))
        return file.filename
    }catch(e){
        throw createHttpError(500, 'File save operation failed')
    }
}