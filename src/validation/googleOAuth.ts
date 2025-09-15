import Joi from "joi";

export const googleOAuthSchema = Joi.object({
    code: Joi.string().required()
})