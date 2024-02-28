import Joi from "joi";

export const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
})

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
})