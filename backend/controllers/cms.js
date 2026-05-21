

import { AnnouncementModel, TeamMemberModel } from '../models/cms.model.js';
import { AppError, asyncHandler } from '../utils/Apperror.js';
import { sendSuccess, sendCreated } from '../utils/response.js';

// ── ANNOUNCEMENTS 
export const getAllAnnouncements = asyncHandler(async (req, res) => {
  const { rows } = await AnnouncementModel.findAll({ actifOnly: false });
  sendSuccess(res, { announcements: rows });
});

export const getPublicAnnouncements = asyncHandler(async (req, res) => {
  const { rows } = await AnnouncementModel.findAll({ actifOnly: true });
  sendSuccess(res, { announcements: rows });
});

export const getAnnouncementById = asyncHandler(async (req, res) => {
  const { rows } = await AnnouncementModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Annonce introuvable.', 404);
  sendSuccess(res, { announcement: rows[0] });
});

export const createAnnouncement = asyncHandler(async (req, res) => {
  const { rows } = await AnnouncementModel.create(req.body);
  sendCreated(res, { announcement: rows[0] }, 'Annonce créée');
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  const { rows: existing } = await AnnouncementModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Annonce introuvable.', 404);
  const { rows } = await AnnouncementModel.update(req.params.id, req.body);
  sendSuccess(res, { announcement: rows[0] }, 'Annonce mise à jour');
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const { rows } = await AnnouncementModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Annonce introuvable.', 404);
  sendSuccess(res, {}, 'Annonce supprimée');
});

// membres du staff
export const getAllTeamMembers = asyncHandler(async (req, res) => {
  const { rows } = await TeamMemberModel.findAll({ actifOnly: false });
  sendSuccess(res, { members: rows });
});

export const getPublicTeamMembers = asyncHandler(async (req, res) => {
  const { rows } = await TeamMemberModel.findAll({ actifOnly: true });
  sendSuccess(res, { members: rows });
});

export const getTeamMemberById = asyncHandler(async (req, res) => {
  const { rows } = await TeamMemberModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Membre introuvable.', 404);
  sendSuccess(res, { member: rows[0] });
});

export const createTeamMember = asyncHandler(async (req, res) => {
  const { rows } = await TeamMemberModel.create(req.body);
  sendCreated(res, { member: rows[0] }, 'Membre créé');
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const { rows: existing } = await TeamMemberModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Membre introuvable.', 404);
  const { rows } = await TeamMemberModel.update(req.params.id, req.body);
  sendSuccess(res, { member: rows[0] }, 'Membre mis à jour');
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  const { rows } = await TeamMemberModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Membre introuvable.', 404);
  sendSuccess(res, {}, 'Membre supprimé');
});