import Joi from 'joi';

// ── Formations ────────────────────────────────────────────────────────────────
export const createFormationSchema = Joi.object({
  titre:        Joi.string().min(2).max(200).required(),
  programme:    Joi.string().min(10).required(),
  benefices:    Joi.string().allow('', null),
  prix:         Joi.number().min(0).default(0),
  date_debut:   Joi.date().iso().required(),
  nb_places:    Joi.number().integer().min(1).required(),
  statut_ouvert: Joi.boolean().default(true),
  formateur_id: Joi.string().uuid().allow(null),
});

export const updateFormationSchema = Joi.object({
  titre:         Joi.string().min(2).max(200),
  programme:     Joi.string().min(10),
  benefices:     Joi.string().allow('', null),
  prix:          Joi.number().min(0),
  date_debut:    Joi.date().iso(),
  nb_places:     Joi.number().integer().min(1),
  statut_ouvert: Joi.boolean(),
  formateur_id:  Joi.string().uuid().allow(null),
}).min(1);

// ── Inscriptions ──────────────────────────────────────────────────────────────
export const createInscriptionSchema = Joi.object({
  formation_id: Joi.string().uuid().required(),
  nom:          Joi.string().min(2).max(150).required(),
  email:        Joi.string().email().required(),
  tel:          Joi.string().min(8).max(50).required(),
});

export const updateInscriptionSchema = Joi.object({
  statut: Joi.string().valid('en_attente', 'confirmee', 'annulee').required(),
});