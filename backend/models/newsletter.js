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

  // Compter les abonnés
  async count() {
    const { rows } = await query(
      `SELECT COUNT(*) as total FROM newsletter_subscribers WHERE actif = TRUE`
    );
    return parseInt(rows[0].total);
  },
};