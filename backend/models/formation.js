import { query } from '../config/database.js';

// ── Formations ────────────────────────────────────────────────────────────────
export const FormationModel = {
  findAll: ({ limit, offset, statut_ouvert } = {}) => {
    const conds = []; const vals = [];
    if (statut_ouvert !== undefined) {
      vals.push(statut_ouvert);
      conds.push(`f.statut_ouvert = $${vals.length}`);
    }
    vals.push(limit, offset);
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(
      `SELECT f.*, u.nom AS formateur_nom,
              (SELECT COUNT(*) FROM inscriptions i WHERE i.formation_id = f.id) AS nb_inscrits
       FROM formations f
       LEFT JOIN users u ON u.id = f.formateur_id
       ${where}
       ORDER BY f.date_debut DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
  },

  count: (filters = {}) => {
    const { statut_ouvert } = filters;
    const conds = []; const vals = [];
    if (statut_ouvert !== undefined) {
      vals.push(statut_ouvert); conds.push(`statut_ouvert = $${vals.length}`);
    }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(`SELECT COUNT(*) FROM formations ${where}`, vals);
  },

  findById: (id) =>
    query(
      `SELECT f.*, u.nom AS formateur_nom,
              (SELECT COUNT(*) FROM inscriptions i WHERE i.formation_id = f.id) AS nb_inscrits
       FROM formations f LEFT JOIN users u ON u.id = f.formateur_id
       WHERE f.id = $1`,
      [id]
    ),

  create: ({ titre, programme, benefices, prix, date_debut, nb_places, statut_ouvert, formateur_id }) =>
    query(
      `INSERT INTO formations (titre, programme, benefices, prix, date_debut, nb_places, statut_ouvert, formateur_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [titre, programme, benefices, prix, date_debut, nb_places, statut_ouvert, formateur_id]
    ),

  update: (id, fields) => {
    const keys = Object.keys(fields);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(
      `UPDATE formations SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(fields), id]
    );
  },

  delete: (id) =>
    query('DELETE FROM formations WHERE id = $1 RETURNING id', [id]),
};

// ── Inscriptions ──────────────────────────────────────────────────────────────
export const InscriptionModel = {
  findByFormation: (formation_id, { limit, offset, statut } = {}) => {
    const conds = [`formation_id = $1`]; const vals = [formation_id];
    if (statut) { vals.push(statut); conds.push(`statut = $${vals.length}`); }
    vals.push(limit, offset);
    return query(
      `SELECT * FROM inscriptions WHERE ${conds.join(' AND ')}
       ORDER BY created_at DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
  },

  countByFormation: (formation_id) =>
    query('SELECT COUNT(*) FROM inscriptions WHERE formation_id = $1', [formation_id]),

  checkDuplicate: (formation_id, email) =>
    query(
      'SELECT id FROM inscriptions WHERE formation_id = $1 AND email = $2',
      [formation_id, email]
    ),

  findById: (id) =>
    query('SELECT * FROM inscriptions WHERE id = $1', [id]),

  create: ({ formation_id, nom, email, tel }) =>
    query(
      `INSERT INTO inscriptions (formation_id, nom, email, tel)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [formation_id, nom, email, tel]
    ),

  update: (id, statut) =>
    query(
      'UPDATE inscriptions SET statut = $1 WHERE id = $2 RETURNING *',
      [statut, id]
    ),
};