import Joi from 'joi';

// ── Salles ────────────────────────────────────────────────────────────────────
export const createSalleSchema = Joi.object({
  numero:   Joi.string().max(50).required(),
  nom:      Joi.string().max(150).required(),
  type: Joi.string()
    .valid('coworking', 'salle_reunion', 'salle_formation', 'lounge')
    .required(),
  capacite: Joi.number().integer().min(1).required(),
  statut: Joi.string()
    .valid('disponible', 'hors_service')
    .default('disponible'),
});

export const updateSalleSchema = Joi.object({
  numero:   Joi.string().max(50),
  nom:      Joi.string().max(150),
  type:     Joi.string().valid('coworking', 'salle_reunion', 'salle_formation', 'lounge'),
  capacite: Joi.number().integer().min(1),
  statut:   Joi.string().valid('disponible', 'hors_service'),
}).min(1);

// ── Réservations ──────────────────────────────────────────────────────────────
export const createReservationSchema = Joi.object({
  salle_id:   Joi.string().uuid().required().messages({ 'any.required': 'Salle requise' }),
  client_nom: Joi.string().min(2).max(150).required(),
  client_tel: Joi.string().min(8).max(50).required(),
  date_debut: Joi.date().iso().greater('now').required().messages({
    'date.greater': 'La date de début doit être dans le futur',
    'any.required': 'Date de début requise',
  }),
  date_fin: Joi.date().iso().greater(Joi.ref('date_debut')).required().messages({
    'date.greater': 'La date de fin doit être après le début',
    'any.required': 'Date de fin requise',
  }),
  montant: Joi.number().min(0).default(0),
});

export const updateReservationSchema = Joi.object({
  statut: Joi.string().valid('en_attente', 'confirmée', 'annulee', 'terminee').required(),
  montant: Joi.number().min(0),
}).min(1);

export const reservationFilterSchema = Joi.object({
  statut:     Joi.string().valid('en_attente', 'confirmee', 'annulee', 'terminee'),
  salle_id:   Joi.string().uuid(),
  date_debut: Joi.date().iso(),
  date_fin:   Joi.date().iso(),
  page:       Joi.number().integer().min(1).default(1),
  limit:      Joi.number().integer().min(1).max(100).default(20),
});