import Joi from "joi"

export const registerSchema = Joi.object({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(30).required().messages({
        'string.pattern.base': '"Username" may only contain letters, numbers and underscores',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required()
})

export const loginSchema = Joi.object({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(30).required().messages({
        'string.pattern.base': '"Username" may only contain letters, numbers and underscores',
    }),
    password: Joi.string().min(8).required(),
})