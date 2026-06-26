import { query } from '../config/database.js';

// Investisseurs 
export const InvestorModel = {
  findAll: ({ limit, offset, statut } = {}) => {
    const conds = []; const vals = [];
    if (statut) { vals.push(statut); conds.push(`statut = $${vals.length}`); }
    vals.push(limit, offset);
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(
      `SELECT * FROM investors ${where}
       ORDER BY created_at DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
  },
  count: (filters = {}) => {
    const { statut } = filters;
    const conds = []; const vals = [];
    if (statut) { vals.push(statut); conds.push(`statut = $${vals.length}`); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(`SELECT COUNT(*) FROM investors ${where}`, vals);
  },
  findById: (id)     => query('SELECT * FROM investors WHERE id = $1', [id]),
  findByEmail: (email) => query('SELECT * FROM investors WHERE email = $1', [email]),
  create: ({ nom, email, tel, secteurs, statut }) =>
    query(
      'INSERT INTO investors (nom, email, tel, secteurs, statut) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [nom, email, tel, secteurs, statut]
    ),
  update: (id, fields) => {
    const keys = Object.keys(fields);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    return query(`UPDATE investors SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(fields), id]);
  },
  delete: (id) => query('DELETE FROM investors WHERE id = $1 RETURNING id', [id]),
};

//Contacts
export const ContactModel = {
  findAll: ({ limit, offset, statut, source } = {}) => {
    const conds = []; const vals = [];
    if (statut) { vals.push(statut); conds.push(`statut = $${vals.length}`); }
    if (source) { vals.push(source); conds.push(`source = $${vals.length}`); }
    vals.push(limit, offset);
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(
      `SELECT * FROM contacts ${where}
       ORDER BY created_at DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
  },
  count: (filters = {}) => {
    const { statut } = filters;
    const conds = []; const vals = [];
    if (statut) { vals.push(statut); conds.push(`statut = $${vals.length}`); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(`SELECT COUNT(*) FROM contacts ${where}`, vals);
  },
  findById: (id) => query('SELECT * FROM contacts WHERE id = $1', [id]),
  create: ({ nom, email, objet, message, source }) =>
    query(
      'INSERT INTO contacts (nom, email, objet, message, source) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [nom, email, objet, message, source || 'site']
    ),
  update: (id, statut) =>
    query('UPDATE contacts SET statut = $1 WHERE id = $2 RETURNING *', [statut, id]),
  monthCount: () =>
    query(`SELECT COUNT(*) FROM contacts WHERE created_at >= DATE_TRUNC('month', NOW())`),
};

// ── Settings 
export const SettingModel = {
  findAll: () => query('SELECT * FROM settings ORDER BY cle ASC'),
  findByCle: (cle) => query('SELECT * FROM settings WHERE cle = $1', [cle]),
  upsert: ({ cle, valeur, description }) =>
    query(
      `INSERT INTO settings (cle, valeur, description, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (cle) DO UPDATE
         SET valeur = EXCLUDED.valeur,
             description = COALESCE(EXCLUDED.description, settings.description),
             updated_at = NOW()
       RETURNING *`,
      [cle, valeur, description]
    ),
  delete: (cle) => query('DELETE FROM settings WHERE cle = $1 RETURNING cle', [cle]),
};

// // ── Content Blocks 
// export const ContentBlockModel = {
//   findAll: ({ page_slug } = {}) => {
//     const conds = []; const vals = [];
//     if (page_slug) { vals.push(page_slug); conds.push(`page_slug = $${vals.length}`); }
//     const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
//     return query(`SELECT * FROM content_blocks ${where} ORDER BY page_slug, bloc_key`, vals);
//   },
//   findByKey: (page_slug, bloc_key) =>
//     query('SELECT * FROM content_blocks WHERE page_slug=$1 AND bloc_key=$2', [page_slug, bloc_key]),
//   upsert: ({ page_slug, bloc_key, valeur_texte, media_url, actif }) =>
//     query(
//       `INSERT INTO content_blocks (page_slug, bloc_key, valeur_texte, media_url, actif, updated_at)
//        VALUES ($1, $2, $3, $4, $5, NOW())
//        ON CONFLICT (page_slug, bloc_key) DO UPDATE
//          SET valeur_texte = EXCLUDED.valeur_texte,
//              media_url    = COALESCE(EXCLUDED.media_url, content_blocks.media_url),
//              actif        = EXCLUDED.actif,
//              updated_at   = NOW()
//        RETURNING *`,
//       [page_slug, bloc_key, valeur_texte, media_url, actif]
//     ),
//   delete: (id) => query('DELETE FROM content_blocks WHERE id = $1 RETURNING id', [id]),
// };


// ── Content Blocks 
export const ContentBlockModel = {
  findAll: ({ page_slug } = {}) => {
    const conds = []; const vals = [];
    if (page_slug) { vals.push(page_slug); conds.push(`page_slug = $${vals.length}`); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    return query(`SELECT * FROM content_blocks ${where} ORDER BY page_slug, bloc_key`, vals);
  },
  
  findByKey: (page_slug, bloc_key) =>
    query('SELECT * FROM content_blocks WHERE page_slug=$1 AND bloc_key=$2', [page_slug, bloc_key]),
  
  upsert: ({ page_slug, bloc_key, valeur_texte, media_url, actif }) =>
    query(
      `INSERT INTO content_blocks (page_slug, bloc_key, valeur_texte, media_url, actif, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (page_slug, bloc_key) DO UPDATE
         SET valeur_texte = EXCLUDED.valeur_texte,
             media_url    = COALESCE(EXCLUDED.media_url, content_blocks.media_url),
             actif        = EXCLUDED.actif,
             updated_at   = NOW()
       RETURNING *`,
      [page_slug, bloc_key, valeur_texte, media_url, actif]
    ),
  
  // ✅ AJOUTER CETTE MÉTHODE
  deleteByKey: (page_slug, bloc_key) =>
    query('DELETE FROM content_blocks WHERE page_slug=$1 AND bloc_key=$2 RETURNING id', [page_slug, bloc_key]),
  
  delete: (id) => query('DELETE FROM content_blocks WHERE id = $1 RETURNING id', [id]),
  deleteAllByPage: (page_slug) =>
    query(
      'DELETE FROM content_blocks WHERE page_slug = $1 RETURNING id',
      [page_slug]
    ),
};

