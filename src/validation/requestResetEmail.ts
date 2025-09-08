import Joi from "joi";

export const requestResetSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Name must be a string',
        'string.email': 'Email must be a valid email format',
        'any.required':'Email is required'
    })
})