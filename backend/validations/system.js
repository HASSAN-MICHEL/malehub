import Joi from 'joi';


export const createInvestorSchema = Joi.object({
  nom:     Joi.string().min(2).max(150).required(),
  email:   Joi.string().email().required(),
  tel:     Joi.string().max(50).allow('', null),
  secteurs: Joi.string().allow('', null),
  statut:  Joi.string().valid('actif', 'inactif').default('actif'),
});

export const updateInvestorSchema = Joi.object({
  nom:     Joi.string().min(2).max(150),
  email:   Joi.string().email(),
  tel:     Joi.string().max(50).allow('', null),
  secteurs: Joi.string().allow('', null),
  statut:  Joi.string().valid('actif', 'inactif'),
}).min(1);


export const createContactSchema = Joi.object({
  nom:     Joi.string().min(2).max(150).required(),
  email:   Joi.string().email().required(),
  objet:   Joi.string().min(2).max(200).required(),
  message: Joi.string().min(10).required(),
  source:  Joi.string().max(100).allow('', null),
  turnstileToken: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  statut: Joi.string().valid('nouveau', 'traite', 'archive').required(),
});

export const upsertSettingSchema = Joi.object({
  cle:         Joi.string().max(150).required(),
  valeur:      Joi.string().allow('', null),
  description: Joi.string().allow('', null),
});

export const upsertContentBlockSchema = Joi.object({
  page_slug:   Joi.string().max(150).required(),
  bloc_key:    Joi.string().max(150).required(),
  valeur_texte: Joi.string().allow('', null),
  media_url:   Joi.string().uri().allow('', null),
  actif:       Joi.boolean().default(true),
});