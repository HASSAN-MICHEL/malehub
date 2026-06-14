import { FormationModel, InscriptionModel } from '../models/formation.js';
import { AppError, asyncHandler } from '../utils/Apperror.js';
import { sendSuccess, sendCreated, sendPaginated, buildPagination } from '../utils/response.js';
import { sendWhatsAppMessage, getInscriptionConfirmationMessage } from '../service/whatsap.js'



// ── Formations
export const getAllFormations = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const filters = {};
  if (req.query.statut_ouvert !== undefined)
    filters.statut_ouvert = req.query.statut_ouvert === 'true';

  const [{ rows }, { rows: cnt }] = await Promise.all([
    FormationModel.findAll({ limit, offset, ...filters }),
    FormationModel.count(filters),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit);
});

export const getFormationById = asyncHandler(async (req, res) => {
  const { rows } = await FormationModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Formation introuvable.', 404);
  sendSuccess(res, { formation: rows[0] });
});

export const createFormation = asyncHandler(async (req, res) => {
  const { rows } = await FormationModel.create(req.body);
  sendCreated(res, { formation: rows[0] }, 'Formation créée');
});

export const updateFormation = asyncHandler(async (req, res) => {
  const { rows: existing } = await FormationModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Formation introuvable.', 404);

  const { rows } = await FormationModel.update(req.params.id, req.body);
  sendSuccess(res, { formation: rows[0] }, 'Formation mise à jour');
});

export const deleteFormation = asyncHandler(async (req, res) => {
  const { rows } = await FormationModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Formation introuvable.', 404);
  sendSuccess(res, {}, 'Formation supprimée');
});

// ── Inscriptions ──────────────────────────────────────────────────────────────
export const getInscriptionsByFormation = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const { id: formation_id } = req.params;

  const [{ rows: formation }] = [await FormationModel.findById(formation_id)];
  if (!formation.length) throw new AppError('Formation introuvable.', 404);

  const [{ rows }, { rows: cnt }] = await Promise.all([
    InscriptionModel.findByFormation(formation_id, { limit, offset, statut: req.query.statut }),
    InscriptionModel.countByFormation(formation_id),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit);
});

export const createInscription = asyncHandler(async (req, res) => {
  const { formation_id, email } = req.body;

  const { rows: formation } = await FormationModel.findById(formation_id);
  if (!formation.length) throw new AppError('Formation introuvable.', 404);
  if (!formation[0].statut_ouvert) throw new AppError('Les inscriptions sont fermées.', 400);

  // Check places
  const { rows: cnt } = await InscriptionModel.countByFormation(formation_id);
  if (+cnt[0].count >= formation[0].nb_places) {
    throw new AppError('Plus de places disponibles pour cette formation.', 400);
  }

  // Check duplicate
  const { rows: dup } = await InscriptionModel.checkDuplicate(formation_id, email);
  if (dup.length) throw new AppError('Vous êtes déjà inscrit à cette formation.', 409);

  const { rows } = await InscriptionModel.create(req.body);
  sendCreated(res, { inscription: rows[0] }, 'Inscription enregistrée');
});

// export const updateInscription = asyncHandler(async (req, res) => {
//   const { rows: existing } = await InscriptionModel.findById(req.params.id);
//   if (!existing.length) throw new AppError('Inscription introuvable.', 404);

//   const { rows } = await InscriptionModel.update(req.params.id, req.body.statut);
//   sendSuccess(res, { inscription: rows[0] }, 'Inscription mise à jour');
// });


export const updateInscription = asyncHandler(async (req, res) => {
  const { rows: existing } = await InscriptionModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Inscription introuvable.', 404);

  const oldStatut = existing[0].statut;
  const newStatut = req.body.statut;
  
  // Mettre à jour le statut
  const { rows } = await InscriptionModel.update(req.params.id, newStatut);
  
  // Si le statut passe à "confirmé" (ou "valide", selon votre système)
  // et que ce n'était pas déjà confirmé
  if (newStatut === 'confirmé' && oldStatut !== 'confirmé') {
    try {
      // Récupérer les informations de la formation
      const { rows: formationRows } = await FormationModel.findById(existing[0].formation_id);
      const formation = formationRows[0];
      
      // Envoyer la notification WhatsApp
      const message = getInscriptionConfirmationMessage(
        formation.titre,
        existing[0].nom
      );
      
      await sendWhatsAppMessage(existing[0].tel, message);
      
      console.log(` Notification WhatsApp envoyée à ${existing[0].tel} pour la formation ${formation.titre}`);
    } catch (whatsappError) {
      // Ne pas bloquer la réponse si WhatsApp échoue, mais logger l'erreur
      console.error(' Erreur lors de l\'envoi WhatsApp:', whatsappError);
    }
  }
  
  sendSuccess(res, { inscription: rows[0] }, 'Inscription mise à jour');
});

export const exportInscriptionsCSV = asyncHandler(async (req, res) => {
  const { rows: formation } = await FormationModel.findById(req.params.id);
  if (!formation.length) throw new AppError('Formation introuvable.', 404);

  const { rows } = await InscriptionModel.findByFormation(req.params.id, { limit: 10000, offset: 0 });

  const header = 'id,nom,email,tel,statut,created_at';
  const csv = [
    header,
    ...rows.map((r) =>
      [r.id, r.nom, r.email, r.tel, r.statut, r.created_at]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    ),
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="inscrits-${req.params.id}.csv"`);
  res.send(csv);
});