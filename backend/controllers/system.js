// import { InvestorModel, ContactModel, SettingModel, ContentBlockModel } from '../models/system.js';
// import { AppError, asyncHandler } from '../utils/Apperror.js';
// import { sendSuccess, sendCreated, sendPaginated, buildPagination } from '../utils/response.js';

// // ── Investisseurs 
// export const getAllInvestors = asyncHandler(async (req, res) => {
//   const { page, limit, offset } = buildPagination(req.query);
//   const filters = { statut: req.query.statut };

//   const [{ rows }, { rows: cnt }] = await Promise.all([
//     InvestorModel.findAll({ limit, offset, ...filters }),
//     InvestorModel.count(filters),
//   ]);

//   sendPaginated(res, rows, +cnt[0].count, page, limit);
// });

// export const getInvestorById = asyncHandler(async (req, res) => {
//   const { rows } = await InvestorModel.findById(req.params.id);
//   if (!rows.length) throw new AppError('Investisseur introuvable.', 404);
//   sendSuccess(res, { investor: rows[0] });
// });

// export const createInvestor = asyncHandler(async (req, res) => {
//   const { rows: existing } = await InvestorModel.findByEmail(req.body.email);
//   if (existing.length) throw new AppError('Cet email investisseur existe déjà.', 409);

//   const { rows } = await InvestorModel.create(req.body);
//   sendCreated(res, { investor: rows[0] }, 'Investisseur créé');
// });

// export const updateInvestor = asyncHandler(async (req, res) => {
//   const { rows: existing } = await InvestorModel.findById(req.params.id);
//   if (!existing.length) throw new AppError('Investisseur introuvable.', 404);

//   const { rows } = await InvestorModel.update(req.params.id, req.body);
//   sendSuccess(res, { investor: rows[0] }, 'Investisseur mis à jour');
// });

// export const deleteInvestor = asyncHandler(async (req, res) => {
//   const { rows } = await InvestorModel.delete(req.params.id);
//   if (!rows.length) throw new AppError('Investisseur introuvable.', 404);
//   sendSuccess(res, {}, 'Investisseur supprimé');
// });

// // ── Contacts ──────────────────────────────────────────────────────────────────
// export const getAllContacts = asyncHandler(async (req, res) => {
//   const { page, limit, offset } = buildPagination(req.query);
//   const filters = { statut: req.query.statut, source: req.query.source };

//   const [{ rows }, { rows: cnt }] = await Promise.all([
//     ContactModel.findAll({ limit, offset, ...filters }),
//     ContactModel.count(filters),
//   ]);

//   sendPaginated(res, rows, +cnt[0].count, page, limit);
// });

// export const getContactById = asyncHandler(async (req, res) => {
//   const { rows } = await ContactModel.findById(req.params.id);
//   if (!rows.length) throw new AppError('Contact introuvable.', 404);
//   sendSuccess(res, { contact: rows[0] });
// });

// // Public endpoint — no auth required
// export const createContact = asyncHandler(async (req, res) => {
//   const { rows } = await ContactModel.create(req.body);
//   sendCreated(res, { contact: rows[0] }, 'Message envoyé avec succès');
// });

// export const updateContact = asyncHandler(async (req, res) => {
//   const { rows: existing } = await ContactModel.findById(req.params.id);
//   if (!existing.length) throw new AppError('Contact introuvable.', 404);

//   // req.body.statut peut être 'traite' ou 'archive'
//   const { rows } = await ContactModel.update(req.params.id, req.body.statut);
//   sendSuccess(res, { contact: rows[0] }, 'Statut mis à jour');
// });


// export const exportContactsCSV = asyncHandler(async (req, res) => {
//   const { rows } = await ContactModel.findAll({ limit: 10000, offset: 0 });

//   const header = 'id,nom,email,objet,statut,source,created_at';
//   const csv = [
//     header,
//     ...rows.map((r) =>
//       [r.id, r.nom, r.email, r.objet, r.statut, r.source, r.created_at]
//         .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
//         .join(',')
//     ),
//   ].join('\n');

//   res.setHeader('Content-Type', 'text/csv; charset=utf-8');
//   res.setHeader('Content-Disposition', `attachment; filename="contacts-${Date.now()}.csv"`);
//   res.send(csv);
// });

// // ── Settings ──────────────────────────────────────────────────────────────────
// export const getAllSettings = asyncHandler(async (req, res) => {
//   const { rows } = await SettingModel.findAll();
//   sendSuccess(res, { settings: rows });
// });

// export const upsertSetting = asyncHandler(async (req, res) => {
//   const { rows } = await SettingModel.upsert(req.body);
//   sendSuccess(res, { setting: rows[0] }, 'Paramètre enregistré');
// });

// export const deleteSetting = asyncHandler(async (req, res) => {
//   const { rows } = await SettingModel.delete(req.params.cle);
//   if (!rows.length) throw new AppError('Paramètre introuvable.', 404);
//   sendSuccess(res, {}, 'Paramètre supprimé');
// });

// // ── Content Blocks ────────────────────────────────────────────────────────────
// export const getAllContentBlocks = asyncHandler(async (req, res) => {
//   const { rows } = await ContentBlockModel.findAll({ page_slug: req.query.page_slug });
//   sendSuccess(res, { blocks: rows });
// });

// export const upsertContentBlock = asyncHandler(async (req, res) => {
//   const { rows } = await ContentBlockModel.upsert(req.body);
//   sendSuccess(res, { block: rows[0] }, 'Bloc de contenu enregistré');
// });

// export const deleteContentBlock = asyncHandler(async (req, res) => {
//   const { rows } = await ContentBlockModel.delete(req.params.id);
//   if (!rows.length) throw new AppError('Bloc introuvable.', 404);
//   sendSuccess(res, {}, 'Bloc supprimé');
// });

// // ── Dashboard KPIs ────────────────────────────────────────────────────────────
// import { query } from '../config/database.js';

// export const getDashboardKPIs = asyncHandler(async (req, res) => {
//   const [reservations, candidatures, inscriptions, investors, contacts] = await Promise.all([
//     query(`SELECT COUNT(*) AS total,
//             COUNT(*) FILTER (WHERE statut = 'en_attente') AS en_attente
//            FROM reservations WHERE date_debut >= DATE_TRUNC('month', NOW())`),
//     query(`SELECT COUNT(*) AS total,
//             COUNT(*) FILTER (WHERE statut = 'nouvelle') AS nouvelles
//            FROM candidatures WHERE created_at >= DATE_TRUNC('month', NOW())`),
//     query(`SELECT COUNT(*) AS total FROM inscriptions WHERE created_at >= DATE_TRUNC('month', NOW())`),
//     query(`SELECT COUNT(*) AS total FROM investors WHERE statut = 'actif'`),
//     query(`SELECT COUNT(*) AS total FROM contacts WHERE statut = 'nouveau'`),
//   ]);

//   sendSuccess(res, {
//     reservations: reservations.rows[0],
//     candidatures: candidatures.rows[0],
//     inscriptions: inscriptions.rows[0],
//     investors:    investors.rows[0],
//     contacts:     contacts.rows[0],
//   });
// });



import { InvestorModel, ContactModel, SettingModel, ContentBlockModel } from '../models/system.js';
import { NewsletterModel } from '../models/newsletter.js';
import { AnnouncementModel, TeamMemberModel } from '../models/cms.js';
import { AppError, asyncHandler } from '../utils/Apperror.js';
import { sendMassEmail } from '../service/EmailService.js';
import { sendSuccess, sendCreated, sendPaginated, buildPagination } from '../utils/response.js';
import axios from 'axios';

//investisseur
export const getAllInvestors = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const filters = { statut: req.query.statut };

  const [{ rows }, { rows: cnt }] = await Promise.all([
    InvestorModel.findAll({ limit, offset, ...filters }),
    InvestorModel.count(filters),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit);
});

export const getInvestorById = asyncHandler(async (req, res) => {
  const { rows } = await InvestorModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Investisseur introuvable.', 404);
  sendSuccess(res, { investor: rows[0] });
});

export const createInvestor = asyncHandler(async (req, res) => {
  const { rows: existing } = await InvestorModel.findByEmail(req.body.email);
  if (existing.length) throw new AppError('Cet email investisseur existe déjà.', 409);

  const { rows } = await InvestorModel.create(req.body);
  sendCreated(res, { investor: rows[0] }, 'Investisseur créé');
});

export const updateInvestor = asyncHandler(async (req, res) => {
  const { rows: existing } = await InvestorModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Investisseur introuvable.', 404);

  const { rows } = await InvestorModel.update(req.params.id, req.body);
  sendSuccess(res, { investor: rows[0] }, 'Investisseur mis à jour');
});

export const deleteInvestor = asyncHandler(async (req, res) => {
  const { rows } = await InvestorModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Investisseur introuvable.', 404);
  sendSuccess(res, {}, 'Investisseur supprimé');
});

// Contacts 
export const getAllContacts = asyncHandler(async (req, res) => {
  const { page, limit, offset } = buildPagination(req.query);
  const filters = { statut: req.query.statut, source: req.query.source };

  const [{ rows }, { rows: cnt }] = await Promise.all([
    ContactModel.findAll({ limit, offset, ...filters }),
    ContactModel.count(filters),
  ]);

  sendPaginated(res, rows, +cnt[0].count, page, limit);
});

export const getContactById = asyncHandler(async (req, res) => {
  const { rows } = await ContactModel.findById(req.params.id);
  if (!rows.length) throw new AppError('Contact introuvable.', 404);
  sendSuccess(res, { contact: rows[0] });
});


//VERSION de contact protégé avec captchat
export const createContact = asyncHandler(async (req, res) => {

  const {
    nom,
    email,
    objet,
    message,
    source,
    turnstileToken
  } = req.body;

  // Vérification présence token
  if (!turnstileToken) {
    return res.status(400).json({
      status: 'error',
      message: 'Vérification CAPTCHA requise',
    });
  }

  // Vérification Cloudflare Turnstile
  const verification = await axios.post(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  // CAPTCHA invalide
  if (!verification.data.success) {
    return res.status(400).json({
      status: 'error',
      message: 'Échec de la vérification anti-bot',
    });
  }

  // Sauvegarde du message
  const { rows } = await ContactModel.create({
    nom,
    email,
    objet,
    message,
    source,
  });

  sendCreated(
    res,
    { contact: rows[0] },
    'Message envoyé avec succès'
  );
});

export const updateContact = asyncHandler(async (req, res) => {
  const { rows: existing } = await ContactModel.findById(req.params.id);
  if (!existing.length) throw new AppError('Contact introuvable.', 404);

  const { rows } = await ContactModel.update(req.params.id, req.body.statut);
  sendSuccess(res, { contact: rows[0] }, 'Statut mis à jour');
});

export const exportContactsCSV = asyncHandler(async (req, res) => {
  const { rows } = await ContactModel.findAll({ limit: 10000, offset: 0 });

  const header = 'id,nom,email,objet,statut,source,created_at';
  const csv = [
    header,
    ...rows.map((r) =>
      [r.id, r.nom, r.email, r.objet, r.statut, r.source, r.created_at]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    ),
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="contacts-${Date.now()}.csv"`);
  res.send(csv);
});

// ── Settings
export const getAllSettings = asyncHandler(async (req, res) => {
  const { rows } = await SettingModel.findAll();
  sendSuccess(res, { settings: rows });
});

export const upsertSetting = asyncHandler(async (req, res) => {
  const { rows } = await SettingModel.upsert(req.body);
  sendSuccess(res, { setting: rows[0] }, 'Paramètre enregistré');
});

export const deleteSetting = asyncHandler(async (req, res) => {
  const { rows } = await SettingModel.delete(req.params.cle);
  if (!rows.length) throw new AppError('Paramètre introuvable.', 404);
  sendSuccess(res, {}, 'Paramètre supprimé');
});

//Content Blocks 
export const getAllContentBlocks = asyncHandler(async (req, res) => {
  const { rows } = await ContentBlockModel.findAll({ page_slug: req.query.page_slug });
  sendSuccess(res, { blocks: rows });
});

export const upsertContentBlock = asyncHandler(async (req, res) => {
  const { rows } = await ContentBlockModel.upsert(req.body);
  sendSuccess(res, { block: rows[0] }, 'Bloc de contenu enregistré');
});

export const deleteContentBlock = asyncHandler(async (req, res) => {
  const { rows } = await ContentBlockModel.delete(req.params.id);
  if (!rows.length) throw new AppError('Bloc introuvable.', 404);
  sendSuccess(res, {}, 'Bloc supprimé');
});

// Dashboard KPI
import { query } from '../config/database.js';

export const getDashboardKPIs = asyncHandler(async (req, res) => {
  const [reservations, candidatures, inscriptions, investors, contacts] = await Promise.all([
    query(`SELECT COUNT(*) AS total,
            COUNT(*) FILTER (WHERE statut = 'en_attente') AS en_attente
           FROM reservations WHERE date_debut >= DATE_TRUNC('month', NOW())`),
    query(`SELECT COUNT(*) AS total,
            COUNT(*) FILTER (WHERE statut = 'nouvelle') AS nouvelles
           FROM candidatures WHERE created_at >= DATE_TRUNC('month', NOW())`),
    query(`SELECT COUNT(*) AS total FROM inscriptions WHERE created_at >= DATE_TRUNC('month', NOW())`),
    query(`SELECT COUNT(*) AS total FROM investors WHERE statut = 'actif'`),
    query(`SELECT COUNT(*) AS total FROM contacts WHERE statut = 'nouveau'`),
  ]);

  sendSuccess(res, {
    reservations: reservations.rows[0],
    candidatures: candidatures.rows[0],
    inscriptions: inscriptions.rows[0],
    investors:    investors.rows[0],
    contacts:     contacts.rows[0],
  });
});

// ── Additional routes needed by frontend admin.js

// GET /settings/:cle — get a single setting by key
export const getSettingByCle = asyncHandler(async (req, res) => {
  const { rows } = await SettingModel.findByCle(req.params.cle);
  if (!rows.length) throw new AppError('Paramètre introuvable.', 404);
  sendSuccess(res, { setting: rows[0] });
});


export const upsertContentBlockById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { valeur_texte, media_url, actif } = req.body;

  // First try to find the block by id
  const { rows: existing } = await import('../config/database.js').then(m =>
    m.query('SELECT * FROM content_blocks WHERE id = $1', [id])
  );

  if (!existing.length) throw new AppError('Bloc de contenu introuvable.', 404);

  const block = existing[0];
  // Use the full upsert so updated_at is refreshed
  const { rows } = await ContentBlockModel.upsert({
    page_slug:    block.page_slug,
    bloc_key:     block.bloc_key,
    valeur_texte: valeur_texte ?? block.valeur_texte,
    media_url:    media_url    ?? block.media_url,
    actif:        actif        ?? block.actif,
  });

  sendSuccess(res, { block: rows[0] }, 'Bloc mis à jour');
});



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


// ── NEWSLETTER 
export const subscribeToNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    throw new AppError('Email valide requis', 400);
  }

  const { rows } = await NewsletterModel.create(email);
  sendCreated(res, { subscriber: rows[0] }, 'Inscription à la newsletter réussie !');
});

export const getAllNewsletterSubscribers = asyncHandler(async (req, res) => {
  const { rows } = await NewsletterModel.getAllActive();
  sendSuccess(res, { subscribers: rows });
});

export const getNewsletterCount = asyncHandler(async (req, res) => {
  const total = await NewsletterModel.count();
  sendSuccess(res, { total });
});


// envoyé les notifications

export const sendNewsletter = asyncHandler(async (req, res) => {
  const { subject, content, isHtml = true } = req.body;
  
  if (!subject || !content) {
    throw new AppError('Sujet et contenu requis', 400);
  }

  // Récupérer tous les emails des abonnés
  const emails = await NewsletterModel.getAllActive();
  
  if (emails.length === 0) {
    throw new AppError('Aucun abonné à la newsletter', 400);
  }

  // Envoyer l'email à tous les abonnés
  const html = isHtml ? content : `<p>${content.replace(/\n/g, '<br>')}</p>`;
  const text = !isHtml ? content : content.replace(/<[^>]*>/g, '');
  
  const result = await sendMassEmail({
    recipients: emails,
    subject,
    html,
    text,
  });

  sendSuccess(res, {
    total: result.total,
    successCount: result.successCount,
    errorCount: result.errorCount,
  }, `Newsletter envoyée à ${result.successCount}/${result.total} abonnés`);
});
