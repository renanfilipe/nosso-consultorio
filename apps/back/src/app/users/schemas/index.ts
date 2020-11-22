import * as Joi from '@hapi/joi'

import validateCPF from '../../../utils/validateCPF'
import { UserRole } from '../user.entity'

const joiValidateCPF = (value: string): boolean => {
  if (!validateCPF(value)) {
    throw new Error();
  }

  return true;
};

export const createUserSchema = Joi.object({
  name: Joi.string().max(255).required(),
  cpf: Joi.string().length(11).custom(joiValidateCPF).required(),
  phone: Joi.string().max(11).required(),
  password: Joi.string().min(8).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  role: Joi.string().valid(UserRole.PATIENT, UserRole.PSYCHOLOGIST),
  oAuthId: Joi.string(),
  oAuthProvider: Joi.string(),
})
  .with('oAuthId', 'oAuthProvider')
  .with('oAuthProvider', 'oAuthId');
