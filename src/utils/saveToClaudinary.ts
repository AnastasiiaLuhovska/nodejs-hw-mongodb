import {getEnvVar} from "./getEnvVar";
import {v2 as cloudinary} from 'cloudinary'
import fs from "fs/promises";
import createHttpError from "http-errors";

cloudinary.config({
    cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME') as string,
    api_key: getEnvVar('CLOUDINARY_API_KEY') as string,
    api_secret: getEnvVar('CLOUDINARY_API_SECRET') as string
})

export const saveToCloudinary = async file =>{
    const {secure_url} = await cloudinary.uploader.upload(file.path, {
         folder:"photos",
         use_filename:true
     })
    try{
         await fs.unlink(file.path)
    }catch(e){
         throw createHttpError(500, 'Fail in uploading file')
    }
    return secure_url

}