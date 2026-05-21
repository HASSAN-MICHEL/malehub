import { query } from '../config/database.js';


export const AnnouncementModel = {
  findAll: ({ actifOnly = false } = {}) => {
    const where = actifOnly ? 'WHERE actif = TRUE' : '';
    return query(
      `SELECT * FROM announcements ${where} ORDER BY ordre ASC, created_at DESC`,
      []
    );
  },

  findById: (id) =>
    query('SELECT * FROM announcements WHERE id = $1', [id]),

  create: ({ titre, description, image_url, date_event, lien_wa, actif = true, ordre = 0 }) =>
    query(
      `INSERT INTO announcements (titre, description, image_url, date_event, lien_wa, actif, ordre, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
      [titre, description, image_url, date_event, lien_wa, actif, ordre]
    ),

  update: (id, fields) => {
    const allowed = ['titre', 'description', 'image_url', 'date_event', 'lien_wa', 'actif', 'ordre'];
    const keys = Object.keys(fields).filter(k => allowed.includes(k));
    if (!keys.length) throw new Error('No valid fields to update');
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(
      `UPDATE announcements SET ${sets}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...keys.map(k => fields[k]), id]
    );
  },

  delete: (id) =>
    query('DELETE FROM announcements WHERE id = $1 RETURNING id', [id]),
};

// Team Members 
export const TeamMemberModel = {
  findAll: ({ actifOnly = false } = {}) => {
    const where = actifOnly ? 'WHERE actif = TRUE' : '';
    return query(
      `SELECT * FROM team_members ${where} ORDER BY ordre ASC, created_at ASC`,
      []
    );
  },

  findById: (id) =>
    query('SELECT * FROM team_members WHERE id = $1', [id]),

  create: ({ nom, role, image_url, bio, actif = true, ordre = 0 }) =>
    query(
      `INSERT INTO team_members (nom, role, image_url, bio, actif, ordre, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [nom, role, image_url, bio, actif, ordre]
    ),

  update: (id, fields) => {
    const allowed = ['nom', 'role', 'image_url', 'bio', 'actif', 'ordre'];
    const keys = Object.keys(fields).filter(k => allowed.includes(k));
    if (!keys.length) throw new Error('No valid fields to update');
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(
      `UPDATE team_members SET ${sets}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...keys.map(k => fields[k]), id]
    );
  },

  delete: (id) =>
    query('DELETE FROM team_members WHERE id = $1 RETURNING id', [id]),
};
