import * as Joi from "@hapi/joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
})
