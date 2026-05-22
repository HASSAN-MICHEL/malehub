import { query } from '../config/database.js';

export const NewsletterModel = {
  // Créer un abonné
  async create(data) {
    const { rows } = await query(
      `INSERT INTO newsletter_subscribers (email, ip_address, user_agent)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) 
       DO UPDATE SET actif = TRUE, unsubscribed_at = NULL, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [data.email, data.ip_address, data.user_agent]
    );
    return { rows };
  },

  // Désabonner un utilisateur
  async unsubscribe(email) {
    const { rows } = await query(
      `UPDATE newsletter_subscribers 
       SET actif = FALSE, unsubscribed_at = CURRENT_TIMESTAMP
       WHERE email = $1
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