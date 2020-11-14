import * as Joi from "@hapi/joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  phone: Joi.string().required(),
})
