import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'any.required': 'Email requis',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Mot de passe trop court (min 6 caractères)',
    'any.required': 'Mot de passe requis',
  }),
});

export const createUserSchema = Joi.object({
  nom: Joi.string().min(2).max(150).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Mot de passe min 8 caractères',
  }),
  role: Joi.string()
    .valid('SUPER_ADMIN', 'ADMIN', 'STAFF', 'MENTOR', 'FORMATEUR')
    .required(),
});

export const updateUserSchema = Joi.object({
  nom:   Joi.string().min(2).max(150),
  email: Joi.string().email(),
  role:  Joi.string().valid('SUPER_ADMIN', 'ADMIN', 'STAFF', 'MENTOR', 'FORMATEUR'),
  actif: Joi.boolean(),
}).min(1);

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword:     Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Les mots de passe ne correspondent pas',
  }),
});