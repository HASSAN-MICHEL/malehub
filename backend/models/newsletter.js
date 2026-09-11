import { query } from '../config/database.js';

export const NewsletterModel = {
  // Créer un abonné
  async create(email) {
    const { rows } = await query(
      `INSERT INTO newsletter_subscribers (email)
       VALUES ($1)
       ON CONFLICT (email) 
       DO UPDATE SET actif = TRUE, unsubscribed_at = NULL
       RETURNING *`,
      [email]
    );
    return { rows };
  },

  // Vérifier si un email est abonné
  async isSubscribed(email) {
    const { rows } = await query(
      `SELECT * FROM newsletter_subscribers 
       WHERE email = $1 AND actif = TRUE`,
      [email]
    );
    return rows.length > 0;
  },

  // Récupérer tous les abonnés actifs
  getAllActive() {
    return query(
      `SELECT id, email, subscribed_at FROM newsletter_subscribers 
       WHERE actif = TRUE 
       ORDER BY subscribed_at DESC`
    );
  },
 async getAllActiveEmails() {
    const { rows } = await query(
      `SELECT email FROM newsletter_subscribers 
       WHERE actif = TRUE 
       ORDER BY subscribed_at DESC`
    );
    return rows.map(row => row.email);
  },
  // Compter les abonnés
  async count() {
    const { rows } = await query(
      `SELECT COUNT(*) as total FROM newsletter_subscribers WHERE actif = TRUE`
    );
    return parseInt(rows[0].total);
  },
  // Recupéré par ID
  async findById(id) {
    const { rows } = await query(
      `SELECT * FROM newsletter_subscribers WHERE id = $1`,
      [id]
    );
    return { rows };
  },

  //  Récupérer un abonné par email
  async findByEmail(email) {
    const { rows } = await query(
      `SELECT * FROM newsletter_subscribers WHERE email = $1`,
      [email]
    );
    return { rows };
  },
  async unsubscribe(id) {
    const { rows } = await query(
      `UPDATE newsletter_subscribers 
       SET actif = FALSE, unsubscribed_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return { rows };
  },

  //  Hard delete (suppression définitive)
  async delete(id) {
    const { rows } = await query(
      `DELETE FROM newsletter_subscribers 
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return { rows };
  },

};
