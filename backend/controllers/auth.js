import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.js';
import { config } from '../config/config.js';
import { AppError, asyncHandler } from '../utils/Apperror.js';
import { sendSuccess } from '../utils/response.js';

const signTokens = (id) => ({
  token: jwt.sign({ id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn }),
  refreshToken: jwt.sign({ id }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiresIn }),
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await UserModel.findByEmail(email);
  if (!rows.length) throw new AppError('Email ou mot de passe incorrect.', 401);

  const user = rows[0];
  if (!user.actif) throw new AppError('Compte désactivé. Contactez un administrateur.', 403);

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) throw new AppError('Email ou mot de passe incorrect.', 401);

  await UserModel.updateLastLogin(user.id);
  const { token, refreshToken } = signTokens(user.id);

  const { password_hash, ...safeUser } = user;

  sendSuccess(res, { user: safeUser, token, refreshToken }, 'Connexion réussie');
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: rt } = req.body;
  if (!rt) throw new AppError('Refresh token requis.', 400);

  let decoded;
  try {
    decoded = jwt.verify(rt, config.jwt.refreshSecret);
  } catch {
    throw new AppError('Refresh token invalide ou expiré.', 401);
  }

  const { rows } = await UserModel.findById(decoded.id);
  if (!rows.length || !rows[0].actif) throw new AppError('Utilisateur introuvable.', 401);

  const { token, refreshToken: newRT } = signTokens(decoded.id);
  sendSuccess(res, { token, refreshToken: newRT }, 'Token renouvelé');
});

export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, { user: req.user }, 'Profil récupéré');
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const { rows } = await UserModel.findByEmail(req.user.email);
  const isValid = await bcrypt.compare(currentPassword, rows[0].password_hash);
  if (!isValid) throw new AppError('Mot de passe actuel incorrect.', 400);

  const hash = await bcrypt.hash(newPassword, 12);
  await UserModel.update(req.user.id, { password_hash: hash });

  sendSuccess(res, {}, 'Mot de passe modifié avec succès');
});

// ── Admin : CRUD Users ────────────────────────────────────────────────────────
export const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role, actif } = req.query;
  const offset = (page - 1) * limit;
  const filters = {};
  if (role  !== undefined) filters.role  = role;
  if (actif !== undefined) filters.actif = actif === 'true';

  const [{ rows }, { rows: cnt }] = await Promise.all([
    UserModel.findAll({ limit: +limit, offset, ...filters }),
    UserModel.count(filters),
  ]);

  res.json({ status: 'success', data: rows, pagination: { total: +cnt[0].count, page: +page, limit: +limit } });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { rows } = await UserModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Utilisateur introuvable.', 404);
  sendSuccess(res, { user: rows[0] });
});

export const createUser = asyncHandler(async (req, res) => {
  const { nom, email, password, role } = req.body;
  const existing = await UserModel.findByEmail(email);
  if (existing.rows.length) throw new AppError('Cet email est déjà utilisé.', 409);

  const password_hash = await bcrypt.hash(password, 12);
  const { rows } = await UserModel.create({ nom, email, password_hash, role });

  res.status(201).json({ status: 'success', message: 'Utilisateur créé.', data: { user: rows[0] } });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { rows: existing } = await UserModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Utilisateur introuvable.', 404);

  const { rows } = await UserModel.update(req.params.id, req.body);
  sendSuccess(res, { user: rows[0] }, 'Utilisateur mis à jour');
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) throw new AppError('Impossible de supprimer votre propre compte.', 400);
  const { rows } = await UserModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Utilisateur introuvable.', 404);
  sendSuccess(res, {}, 'Utilisateur supprimé');
});