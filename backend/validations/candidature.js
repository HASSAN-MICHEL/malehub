import Joi from 'joi';

// ── Candidatures ──────────────────────────────────────────────────────────────
export const createCandidatureSchema = Joi.object({
  nom:         Joi.string().min(2).max(150).required(),
  email:       Joi.string().email().required(),
  tel:         Joi.string().min(8).max(50).required(),
  nom_projet:  Joi.string().min(2).max(200).required(),
  description: Joi.string().min(10).required().messages({
    'string.min': 'Description trop courte (min 10 caractères)',
  }),
});

export const updateCandidatureSchema = Joi.object({
  statut: Joi.string().valid('nouvelle', 'evaluation', 'acceptee', 'refusee'),
  notes:  Joi.string().allow('', null),
}).min(1);

// ── Projets Incubés ───────────────────────────────────────────────────────────
export const createProjetIncubeSchema = Joi.object({
  candidature_id: Joi.string().uuid().required(),
  mentor_id:      Joi.string().uuid().allow(null),
  stade:          Joi.string().max(100).allow('', null),
  progression:    Joi.number().integer().min(0).max(100).default(0),
});

export const updateProjetIncubeSchema = Joi.object({
  mentor_id:   Joi.string().uuid().allow(null),
  stade:       Joi.string().max(100).allow('', null),
  progression: Joi.number().integer().min(0).max(100),
  statut:      Joi.string().valid('actif', 'en_pause', 'terminé'),
}).min(1);