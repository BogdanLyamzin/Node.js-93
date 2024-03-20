import Joi from "joi";

export const typeAddSchema = Joi.object({
    name: Joi.string().required(),
})