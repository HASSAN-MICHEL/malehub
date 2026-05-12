import { CandidatureModel, ProjetIncubeModel } from '../models/candidature.js';
import { AppError, asyncHandler } from '../utils/Apperror.js';
import { sendSuccess, sendCreated, sendPaginated, buildPagination } from '../utils/response.js';

// ── Candidatures ──────────────────────────────────────────────────────────────
export const getAllCandidatures = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const filters = { statut: req.query.statut };

  const [{ rows }, { rows: cnt }] = await Promise.all([
    CandidatureModel.findAll({ limit, offset, ...filters }),
    CandidatureModel.count(filters),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit);
});

export const getCandidatureById = asyncHandler(async (req, res) => {
  const { rows } = await CandidatureModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Candidature introuvable.', 404);
  sendSuccess(res, { candidature: rows[0] });
});

export const createCandidature = asyncHandler(async (req, res) => {
  const { rows } = await CandidatureModel.create(req.body);
  sendCreated(res, { candidature: rows[0] }, 'Candidature soumise avec succès');
});

export const updateCandidature = asyncHandler(async (req, res) => {
  const { rows: existing } = await CandidatureModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Candidature introuvable.', 404);

  const { rows } = await CandidatureModel.update(req.params.id, req.body);
  sendSuccess(res, { candidature: rows[0] }, 'Candidature mise à jour');
});

export const getCandidatureStats = asyncHandler(async (req, res) => {
  const [all, month] = await Promise.all([
    CandidatureModel.count(),
    CandidatureModel.monthStats(),
  ]);
  sendSuccess(res, { total: +all.rows[0].count, byStatut: month.rows });
});

// ── Projets Incubés ───────────────────────────────────────────────────────────
export const getAllProjetsIncubes = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const filters = { statut: req.query.statut };

  const [{ rows }, { rows: cnt }] = await Promise.all([
    ProjetIncubeModel.findAll({ limit, offset, ...filters }),
    ProjetIncubeModel.count(filters),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit);
});

export const getProjetIncubeById = asyncHandler(async (req, res) => {
  const { rows } = await ProjetIncubeModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Projet incubé introuvable.', 404);
  sendSuccess(res, { projet: rows[0] });
});

export const createProjetIncube = asyncHandler(async (req, res) => {
  const { candidature_id } = req.body;

  // Verify candidature exists and is accepted
  const { rows: cand } = await CandidatureModel.findById(candidature_id);
  if (!cand.length) throw new AppError('Candidature introuvable.', 404);
  if (cand[0].statut !== 'acceptée') {
    throw new AppError('Seules les candidatures acceptées peuvent être incubées.', 400);
  }

  // Check not already incubed
  const { rows: existing } = await ProjetIncubeModel.findByCandidature(candidature_id);
  if (existing.length) throw new AppError('Cette candidature est déjà dans l\'incubateur.', 409);

  const { rows } = await ProjetIncubeModel.create(req.body);
  sendCreated(res, { projet: rows[0] }, 'Projet incubé créé');
});

export const updateProjetIncube = asyncHandler(async (req, res) => {
  const { rows: existing } = await ProjetIncubeModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Projet incubé introuvable.', 404);

  const { rows } = await ProjetIncubeModel.update(req.params.id, req.body);
  sendSuccess(res, { projet: rows[0] }, 'Projet mis à jour');
});