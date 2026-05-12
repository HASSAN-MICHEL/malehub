import { query } from '../config/database.js';

// ── Salles 
export const SalleModel = {
  findAll: () =>
    query('SELECT * FROM salles ORDER BY numero ASC'),

  findById: (id) =>
    query('SELECT * FROM salles WHERE id = $1', [id]),

  findByNumero: (numero) =>
    query('SELECT * FROM salles WHERE numero = $1', [numero]),

  create: ({ numero, nom, type, capacite, statut = 'disponible' }) =>
    query(
      `INSERT INTO salles (numero, nom, type, capacite, statut)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [numero, nom, type, capacite, statut]
    ),

  update: (id, fields) => {
    const keys = Object.keys(fields);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(
      `UPDATE salles SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(fields), id]
    );
  },

  delete: (id) =>
    query('DELETE FROM salles WHERE id = $1 RETURNING id', [id]),
};

// ── Réservations ──────────────────────────────────────────────────────────────
export const ReservationModel = {
  findAll: ({ limit, offset, statut, salle_id, date_debut, date_fin } = {}) => {
    const conds = []; const vals = [];
    if (statut)    { vals.push(statut);    conds.push(`r.statut = $${vals.length}`); }
    if (salle_id)  { vals.push(salle_id);  conds.push(`r.salle_id = $${vals.length}`); }
    if (date_debut){ vals.push(date_debut);conds.push(`r.date_debut >= $${vals.length}`); }
    if (date_fin)  { vals.push(date_fin);  conds.push(`r.date_fin <= $${vals.length}`); }
    vals.push(limit, offset);
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(
      `SELECT r.*, s.nom AS salle_nom, s.type AS salle_type
       FROM reservations r
       JOIN salles s ON s.id = r.salle_id
       ${where}
       ORDER BY r.date_debut DESC
       LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
  },

  count: (filters = {}) => {
    const { statut, salle_id } = filters;
    const conds = []; const vals = [];
    if (statut)   { vals.push(statut);   conds.push(`statut = $${vals.length}`); }
    if (salle_id) { vals.push(salle_id); conds.push(`salle_id = $${vals.length}`); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(`SELECT COUNT(*) FROM reservations ${where}`, vals);
  },

  findById: (id) =>
    query(
      `SELECT r.*, s.nom AS salle_nom, s.type AS salle_type
       FROM reservations r JOIN salles s ON s.id = r.salle_id
       WHERE r.id = $1`,
      [id]
    ),

  checkConflict: (salle_id, date_debut, date_fin, excludeId = null) => {
    const vals = [salle_id, date_debut, date_fin];
    const excludeClause = excludeId ? `AND id != $4` : '';
    if (excludeId) vals.push(excludeId);
    return query(
      `SELECT id FROM reservations
       WHERE salle_id = $1
         AND statut NOT IN ('annulée','terminée')
         AND tsrange(date_debut, date_fin) && tsrange($2, $3)
         ${excludeClause}`,
      vals
    );
  },

  create: ({ salle_id, client_nom, client_tel, date_debut, date_fin, montant = 0 }) =>
    query(
      `INSERT INTO reservations (salle_id, client_nom, client_tel, date_debut, date_fin, montant)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [salle_id, client_nom, client_tel, date_debut, date_fin, montant]
    ),

  update: (id, fields) => {
    const keys = Object.keys(fields);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(
      `UPDATE reservations SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(fields), id]
    );
  },

  monthlyStats: () =>
    query(
      `SELECT DATE_TRUNC('month', date_debut) AS mois,
              COUNT(*) AS total,
              COUNT(*) FILTER (WHERE statut = 'confirmée') AS confirmees,
              SUM(montant) AS revenus
       FROM reservations
       WHERE date_debut >= NOW() - INTERVAL '6 months'
       GROUP BY mois ORDER BY mois ASC`
    ),

  occupancyRate: () =>
    query(
      `SELECT
         COUNT(*) FILTER (WHERE statut = 'confirmée') AS confirmees,
         COUNT(*) AS total
       FROM reservations
       WHERE date_debut >= DATE_TRUNC('month', NOW())`
    ),
};