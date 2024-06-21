import Joi from "joi"

export const registerSchema = Joi.object({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})