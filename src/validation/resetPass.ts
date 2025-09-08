import Joi from "joi";

export const resetPassSchema = Joi.object({
    password: Joi.string().required().messages({
        'string.base': 'Password must be a string',
        'any.required': 'Password is required'
    }),
    token: Joi.string().required()
})