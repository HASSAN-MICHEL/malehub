import { query } from '../config/database.js';

// candidatures
export const CandidatureModel = {
  findAll: ({ limit, offset, statut } = {}) => {
    const conds = []; const vals = [];
    if (statut) { vals.push(statut); conds.push(`statut = $${vals.length}`); }
    vals.push(limit, offset);
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(
      `SELECT * FROM candidatures ${where}
       ORDER BY created_at DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
  },

  count: (filters = {}) => {
    const { statut } = filters;
    const conds = []; const vals = [];
    if (statut) { vals.push(statut); conds.push(`statut = $${vals.length}`); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(`SELECT COUNT(*) FROM candidatures ${where}`, vals);
  },

  findById: (id) =>
    query('SELECT * FROM candidatures WHERE id = $1', [id]),

  create: ({ nom, email, tel, nom_projet, description }) =>
    query(
      `INSERT INTO candidatures (nom, email, tel, nom_projet, description)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nom, email, tel, nom_projet, description]
    ),

  update: (id, fields) => {
    const keys = Object.keys(fields);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(
      `UPDATE candidatures SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(fields), id]
    );
  },

  monthStats: () =>
    query(
      `SELECT statut, COUNT(*) AS total
       FROM candidatures
       WHERE created_at >= DATE_TRUNC('month', NOW())
       GROUP BY statut`
    ),
};

// ── Projets Incubés
export const ProjetIncubeModel = {
  findAll: ({ limit, offset, statut } = {}) => {
    const conds = []; const vals = [];
    if (statut) { vals.push(statut); conds.push(`p.statut = $${vals.length}`); }
    vals.push(limit, offset);
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(
      `SELECT p.*,
              c.nom AS candidat_nom, c.email AS candidat_email,
              c.nom_projet, c.tel AS candidat_tel,
              u.nom AS mentor_nom, u.email AS mentor_email
       FROM projets_incubes p
       JOIN candidatures c ON c.id = p.candidature_id
       LEFT JOIN users u ON u.id = p.mentor_id
       ${where}
       ORDER BY p.created_at DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
  },

  count: (filters = {}) => {
    const { statut } = filters;
    const conds = []; const vals = [];
    if (statut) { vals.push(statut); conds.push(`statut = $${vals.length}`); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(`SELECT COUNT(*) FROM projets_incubes ${where}`, vals);
  },

  findById: (id) =>
    query(
      `SELECT p.*,
              c.nom AS candidat_nom, c.email AS candidat_email, c.nom_projet, c.tel AS candidat_tel,
              u.nom AS mentor_nom, u.email AS mentor_email
       FROM projets_incubes p
       JOIN candidatures c ON c.id = p.candidature_id
       LEFT JOIN users u ON u.id = p.mentor_id
       WHERE p.id = $1`,
      [id]
    ),

  findByCandidature: (candidature_id) =>
    query('SELECT * FROM projets_incubes WHERE candidature_id = $1', [candidature_id]),

  create: ({ candidature_id, mentor_id = null, stade = null, progression = 0 }) =>
    query(
      `INSERT INTO projets_incubes (candidature_id, mentor_id, stade, progression)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [candidature_id, mentor_id, stade, progression]
    ),

  update: (id, fields) => {
    const keys = Object.keys(fields);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(
      `UPDATE projets_incubes SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(fields), id]
    );
  },
};