import Joi from "joi";

    export const validationSchemaContact = Joi.object({
    name: Joi.string().trim().min(3).max(30).required(),
    phoneNumber: Joi.string().trim().pattern(/^[\+]?[\d\s\-\(\)\.]{10,18}$/).required(),
    email: Joi.string().trim().email().lowercase(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal', 'home', 'work').required()
})


export const validationUpdateContact = Joi.object({
    name: Joi.string().trim().min(3).max(30),
    phoneNumber: Joi.string().trim().pattern(/^[\+]?[\d\s\-\(\)\.]{10,18}$/),
    email: Joi.string().trim().email().lowercase(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal', 'home', 'work')
})