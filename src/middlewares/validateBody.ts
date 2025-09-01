
import createHttpError from "http-errors";
import Joi from "joi";

export const validateBody = (validationSchema:Joi.ObjectSchema) => async(req, res, next)=>{
    const body = req.body
    try{
      validationSchema.validate(body, {abortEarly: false })
        next()
 }catch(e){
        next(createHttpError('400', 'Bad Request', {errors: e.details}))
    }
}