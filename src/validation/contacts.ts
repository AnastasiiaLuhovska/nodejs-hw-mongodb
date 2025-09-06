import Joi from "joi";

    export const validationSchemaContact = Joi.object({
    name: Joi.string().trim().min(3).max(30).required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must contain at least 3 characters',
        'string.max': 'Name should not be longer than 30 characters',
        'any.required': 'Name is required'
    }),
    phoneNumber: Joi.string().trim().pattern(/^[\+]?[\d\s\-\(\)\.]{10,18}$/).required().messages({
        'string.base': 'Phone number must be a string',
        'string.pattern.base': 'Phone number must contain 10-18 digits and may include +, spaces, dashes, parentheses, dots',
        'any.required': 'Phone number is required'
    }),
    email: Joi.string().trim().email().lowercase().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email format',
    }),
    isFavourite: Joi.boolean().messages({
        'boolean.base': 'Favourite field must be true or false'
    }),
    contactType: Joi.string().valid('personal', 'home', 'work').required().messages({
        'string.base': 'Contact type must be a string',
        'any.only': 'Contact type must be one of: personal, home, or work',
        'any.required': 'Contact type is required'
    })
})


export const validationUpdateContact = Joi.object({
    name: Joi.string().trim().min(3).max(30).messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must contain at least 3 characters',
        'string.max': 'Name should not be longer than 30 characters',
    }),
    phoneNumber: Joi.string().trim().pattern(/^[\+]?[\d\s\-\(\)\.]{10,18}$/).messages({
        'string.base': 'Phone number must be a string',
        'string.pattern.base': 'Phone number must contain 10-18 digits and may include +, spaces, dashes, parentheses, dots',
    }),
    email: Joi.string().trim().email().lowercase().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email format',
    }),
    isFavourite: Joi.boolean().messages({
        'boolean.base': 'Favourite field must be true or false'
    }),
    contactType: Joi.string().valid('personal', 'home', 'work').messages({
        'string.base': 'Contact type must be a string',
        'any.only': 'Contact type must be one of: personal, home, or work',
    }),
    createdAt: Joi.date().iso().messages({
        'date.base': 'Created date must be a valid date',
        'date.format': 'Created date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)',
    }),
    updatedAt: Joi.date().iso().messages({
        'date.base': 'Created date must be a valid date',
        'date.format': 'Created date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)',
    })
})