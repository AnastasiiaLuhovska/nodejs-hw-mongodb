import nodemailer from 'nodemailer'
import {getEnvVar} from "./getEnvVar";


const transporter = nodemailer.createTransport({
    host: getEnvVar('BREVO_HOST'),
    port: Number(getEnvVar('BREVO_PORT')),
    secure: false,
    auth:{
        user:getEnvVar('BREVO_USER'),
        pass: getEnvVar('BREVO_PASSWORD')
}
} as nodemailer.TransportOptions)


export const sendMail = async(email)=>{

    return await transporter.sendMail(email)
}