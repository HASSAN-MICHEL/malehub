import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';
import { config } from '../config/config.js';
import { AppError, asyncHandler } from '../utils/Apperror.js';

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Non authentifié. Token manquant.', 401);
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, config.jwt.secret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') throw new AppError('Token expiré.', 401);
    throw new AppError('Token invalide.', 401);
  }

  const { rows } = await query(
    'SELECT id, nom, email, role, actif FROM users WHERE id = $1',
    [decoded.id]
  );

  if (!rows.length || !rows[0].actif) {
    throw new AppError('Utilisateur introuvable ou désactivé.', 401);
  }

  req.user = rows[0];
  next();
});

export const authorize = (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`Accès refusé. Rôles autorisés : ${roles.join(', ')}`, 403));
    }
    next();
  };

// Roles hierarchy helper
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN:       'ADMIN',
  STAFF:       'STAFF',
  MENTOR:      'MENTOR',
  FORMATEUR:   'FORMATEUR',
};

export const adminOnly      = authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN);
export const staffAndAbove  = authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.STAFF);
export const mentorAndAbove = authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.STAFF, ROLES.MENTOR);
export const anyRole        = authorize(...Object.values(ROLES));