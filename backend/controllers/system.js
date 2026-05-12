import { InvestorModel, ContactModel, SettingModel, ContentBlockModel } from '../models/system.js';
import { AppError, asyncHandler } from '../utils/Apperror.js';
import { sendSuccess, sendCreated, sendPaginated, buildPagination } from '../utils/response.js';

// ── Investisseurs ─────────────────────────────────────────────────────────────
export const getAllInvestors = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const filters = { statut: req.query.statut };

  const [{ rows }, { rows: cnt }] = await Promise.all([
    InvestorModel.findAll({ limit, offset, ...filters }),
    InvestorModel.count(filters),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit);
});

export const getInvestorById = asyncHandler(async (req, res) => {
  const { rows } = await InvestorModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Investisseur introuvable.', 404);
  sendSuccess(res, { investor: rows[0] });
});

export const createInvestor = asyncHandler(async (req, res) => {
  const { rows: existing } = await InvestorModel.findByEmail(req.body.email);
  if (existing.length) throw new AppError('Cet email investisseur existe déjà.', 409);

  const { rows } = await InvestorModel.create(req.body);
  sendCreated(res, { investor: rows[0] }, 'Investisseur créé');
});

export const updateInvestor = asyncHandler(async (req, res) => {
  const { rows: existing } = await InvestorModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Investisseur introuvable.', 404);

  const { rows } = await InvestorModel.update(req.params.id, req.body);
  sendSuccess(res, { investor: rows[0] }, 'Investisseur mis à jour');
});

export const deleteInvestor = asyncHandler(async (req, res) => {
  const { rows } = await InvestorModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Investisseur introuvable.', 404);
  sendSuccess(res, {}, 'Investisseur supprimé');
});

// ── Contacts ──────────────────────────────────────────────────────────────────
export const getAllContacts = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const filters = { statut: req.query.statut, source: req.query.source };

  const [{ rows }, { rows: cnt }] = await Promise.all([
    ContactModel.findAll({ limit, offset, ...filters }),
    ContactModel.count(filters),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit);
});

export const getContactById = asyncHandler(async (req, res) => {
  const { rows } = await ContactModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Contact introuvable.', 404);
  sendSuccess(res, { contact: rows[0] });
});

// Public endpoint — no auth required
export const createContact = asyncHandler(async (req, res) => {
  const { rows } = await ContactModel.create(req.body);
  sendCreated(res, { contact: rows[0] }, 'Message envoyé avec succès');
});

export const updateContact = asyncHandler(async (req, res) => {
  const { rows: existing } = await ContactModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Contact introuvable.', 404);

  // req.body.statut peut être 'traite' ou 'archive'
  const { rows } = await ContactModel.update(req.params.id, req.body.statut);
  sendSuccess(res, { contact: rows[0] }, 'Statut mis à jour');
});


export const exportContactsCSV = asyncHandler(async (req, res) => {
  const { rows } = await ContactModel.findAll({ limit: 10000, offset: 0 });

  const header = 'id,nom,email,objet,statut,source,created_at';
  const csv = [
    header,
    ...rows.map((r) =>
      [r.id, r.nom, r.email, r.objet, r.statut, r.source, r.created_at]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    ),
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="contacts-${Date.now()}.csv"`);
  res.send(csv);
});

// ── Settings ──────────────────────────────────────────────────────────────────
export const getAllSettings = asyncHandler(async (req, res) => {
  const { rows } = await SettingModel.findAll();
  sendSuccess(res, { settings: rows });
});

export const upsertSetting = asyncHandler(async (req, res) => {
  const { rows } = await SettingModel.upsert(req.body);
  sendSuccess(res, { setting: rows[0] }, 'Paramètre enregistré');
});

export const deleteSetting = asyncHandler(async (req, res) => {
  const { rows } = await SettingModel.delete(req.params.cle);
  if (!rows.length) throw new AppError('Paramètre introuvable.', 404);
  sendSuccess(res, {}, 'Paramètre supprimé');
});

// ── Content Blocks ────────────────────────────────────────────────────────────
export const getAllContentBlocks = asyncHandler(async (req, res) => {
  const { rows } = await ContentBlockModel.findAll({ page_slug: req.query.page_slug });
  sendSuccess(res, { blocks: rows });
});

export const upsertContentBlock = asyncHandler(async (req, res) => {
  const { rows } = await ContentBlockModel.upsert(req.body);
  sendSuccess(res, { block: rows[0] }, 'Bloc de contenu enregistré');
});

export const deleteContentBlock = asyncHandler(async (req, res) => {
  const { rows } = await ContentBlockModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Bloc introuvable.', 404);
  sendSuccess(res, {}, 'Bloc supprimé');
});

// ── Dashboard KPIs ────────────────────────────────────────────────────────────
import { query } from '../config/database.js';

export const getDashboardKPIs = asyncHandler(async (req, res) => {
  const [reservations, candidatures, inscriptions, investors, contacts] = await Promise.all([
    query(`SELECT COUNT(*) AS total,
            COUNT(*) FILTER (WHERE statut = 'en_attente') AS en_attente
           FROM reservations WHERE date_debut >= DATE_TRUNC('month', NOW())`),
    query(`SELECT COUNT(*) AS total,
            COUNT(*) FILTER (WHERE statut = 'nouvelle') AS nouvelles
           FROM candidatures WHERE created_at >= DATE_TRUNC('month', NOW())`),
    query(`SELECT COUNT(*) AS total FROM inscriptions WHERE created_at >= DATE_TRUNC('month', NOW())`),
    query(`SELECT COUNT(*) AS total FROM investors WHERE statut = 'actif'`),
    query(`SELECT COUNT(*) AS total FROM contacts WHERE statut = 'nouveau'`),
  ]);

  sendSuccess(res, {
    reservations: reservations.rows[0],
    candidatures: candidatures.rows[0],
    inscriptions: inscriptions.rows[0],
    investors:    investors.rows[0],
    contacts:     contacts.rows[0],
  });
});