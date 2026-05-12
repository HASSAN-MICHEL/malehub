import { query } from '../config/database.js';

const SAFE_FIELDS = 'id, nom, email, role, actif, created_at, last_login';

export const UserModel = {
  findAll: ({ limit, offset, role, actif } = {}) => {
    const conditions = [];
    const values = [];
    if (role  !== undefined) { values.push(role);  conditions.push(`role = $${values.length}`); }
    if (actif !== undefined) { values.push(actif); conditions.push(`actif = $${values.length}`); }
    values.push(limit, offset);
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    return query(
      `SELECT ${SAFE_FIELDS} FROM users ${where}
       ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`,
      values
    );
  },

  count: (filters = {}) => {
    const { role, actif } = filters;
    const conds = []; const vals = [];
    if (role  !== undefined) { vals.push(role);  conds.push(`role = $${vals.length}`); }
    if (actif !== undefined) { vals.push(actif); conds.push(`actif = $${vals.length}`); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(`SELECT COUNT(*) FROM users ${where}`, vals);
  },

  findById: (id) =>
    query(`SELECT ${SAFE_FIELDS} FROM users WHERE id = $1`, [id]),

  findByEmail: (email) =>
    query('SELECT * FROM users WHERE email = $1', [email]),

  create: ({ nom, email, password_hash, role }) =>
    query(
      `INSERT INTO users (nom, email, password_hash, role)
       VALUES ($1, $2, $3, $4) RETURNING ${SAFE_FIELDS}`,
      [nom, email, password_hash, role]
    ),

  update: (id, fields) => {
    const keys = Object.keys(fields);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(
      `UPDATE users SET ${sets} WHERE id = $${keys.length + 1} RETURNING ${SAFE_FIELDS}`,
      [...Object.values(fields), id]
    );
  },

  updateLastLogin: (id) =>
    query('UPDATE users SET last_login = NOW() WHERE id = $1', [id]),

  delete: (id) =>
    query('DELETE FROM users WHERE id = $1 RETURNING id', [id]),
};