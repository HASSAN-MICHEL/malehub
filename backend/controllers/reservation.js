import { SalleModel, ReservationModel } from '../models/reservation.js';
import { AppError, asyncHandler } from '../utils/Apperror.js';
import { sendSuccess, sendCreated, sendPaginated, buildPagination } from '../utils/response.js';

// ── Salles ────────────────────────────────────────────────────────────────────
export const getAllSalles = asyncHandler(async (req, res) => {
  const { rows } = await SalleModel.findAll();
  sendSuccess(res, { salles: rows });
});

export const getSalleById = asyncHandler(async (req, res) => {
  const { rows } = await SalleModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Salle introuvable.', 404);
  sendSuccess(res, { salle: rows[0] });
});

export const createSalle = asyncHandler(async (req, res) => {
  const { rows: existing } = await SalleModel.findByNumero(req.body.numero);
  if (existing.length) throw new AppError('Ce numéro de salle existe déjà.', 409);

  const { rows } = await SalleModel.create(req.body);
  sendCreated(res, { salle: rows[0] }, 'Salle créée');
});

export const updateSalle = asyncHandler(async (req, res) => {
  const { rows: existing } = await SalleModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Salle introuvable.', 404);

  const { rows } = await SalleModel.update(req.params.id, req.body);
  sendSuccess(res, { salle: rows[0] }, 'Salle mise à jour');
});

export const deleteSalle = asyncHandler(async (req, res) => {
  const { rows } = await SalleModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Salle introuvable.', 404);
  sendSuccess(res, {}, 'Salle supprimée');
});

// ── Réservations ──────────────────────────────────────────────────────────────
export const getAllReservations = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const filters = {
    statut:    req.query.statut,
    salle_id:  req.query.salle_id,
    date_debut: req.query.date_debut,
    date_fin:   req.query.date_fin,
  };

  const [{ rows }, { rows: cnt }] = await Promise.all([
    ReservationModel.findAll({ limit, offset, ...filters }),
    ReservationModel.count(filters),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit, 'Réservations récupérées');
});

export const getReservationById = asyncHandler(async (req, res) => {
  const { rows } = await ReservationModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Réservation introuvable.', 404);
  sendSuccess(res, { reservation: rows[0] });
});

export const createReservation = asyncHandler(async (req, res) => {
  const { salle_id, date_debut, date_fin } = req.body;

  // Check salle exists
  const { rows: salle } = await SalleModel.findById(salle_id);
  if (!salle.length) throw new AppError('Salle introuvable.', 404);
  if (salle[0].statut === 'hors_service') throw new AppError('Cette salle est hors service.', 400);

  // Check conflicts
  const { rows: conflict } = await ReservationModel.checkConflict(salle_id, date_debut, date_fin);
  if (conflict.length) throw new AppError('Ce créneau est déjà réservé pour cette salle.', 409);

  const { rows } = await ReservationModel.create(req.body);
  sendCreated(res, { reservation: rows[0] }, 'Réservation créée');
});

export const updateReservation = asyncHandler(async (req, res) => {
  const { rows: existing } = await ReservationModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Réservation introuvable.', 404);

  const { rows } = await ReservationModel.update(req.params.id, req.body);
  sendSuccess(res, { reservation: rows[0] }, 'Réservation mise à jour');
});

export const getReservationStats = asyncHandler(async (req, res) => {
  const [monthly, occupancy] = await Promise.all([
    ReservationModel.monthlyStats(),
    ReservationModel.occupancyRate(),
  ]);
  sendSuccess(res, { monthly: monthly.rows, occupancy: occupancy.rows[0] });
});

export const exportReservationsCSV = asyncHandler(async (req, res) => {
  const filters = {
    statut:    req.query.statut,
    salle_id:  req.query.salle_id,
    date_debut: req.query.date_debut,
    date_fin:   req.query.date_fin,
  };
  const { rows } = await ReservationModel.findAll({ limit: 10000, offset: 0, ...filters });

  const header = 'id,client_nom,client_tel,salle_nom,date_debut,date_fin,statut,montant,created_at';
  const csv = [
    header,
    ...rows.map((r) =>
      [r.id, r.client_nom, r.client_tel, r.salle_nom, r.date_debut, r.date_fin, r.statut, r.montant, r.created_at]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    ),
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="reservations-${Date.now()}.csv"`);
  res.send(csv);
});