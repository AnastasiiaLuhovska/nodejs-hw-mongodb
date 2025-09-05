import Joi from "joi";
import {emailRegexp} from "../constants/constants";

export const validationSchemaRegister = Joi.object({
    name: Joi.string().trim().min(3).max(30).required().messages({
            'string.base': "Name must be a string",
            'string.min': 'Name must contain at least 3 characters',
            'string.max': 'Name should not be longer than 30 characters',
            'any.required': 'Name is required'
        }),
    email: Joi.string().trim().pattern(emailRegexp).required().messages({
        'string.base': 'Email must be a string',
        'string.pattern.base': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password must be a string',
        'any.required': 'Password is required'
    })
}).required().messages({
    'any.required': 'Request body is required'})

export const validationSchemaLogin = Joi.object({
    email: Joi.string().trim().pattern(emailRegexp).required().messages({
        'string.base': 'Email must be a string',
        'string.pattern.base': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password must be a string',
        'any.required': 'Password is required'
    })
}).required().messages({
    'any.required': 'Request body is required'})