import { Router } from 'express';
import * as miscCtrl from '../controllers/system.js';
import { protect, staffAndAbove, adminOnly } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  createInvestorSchema,
  updateInvestorSchema,
  createContactSchema,
  updateContactSchema,
  upsertSettingSchema,
  upsertContentBlockSchema,
} from '../validations/system.js';
import { upload } from '../config/multer.js';
import path from 'path';

const router = Router();
// ye



router.post(
  '/upload',
  protect,
  adminOnly,
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          message: 'Aucun fichier'
        });
     }      // req.file.filename contient le nom du fichier
      // req.file.path contient le chemin complet


console.log('File received:', req.file.filename);
console.log('File path:', req.file.path);
      const url = `/uploads/${req.file.filename}`;

      return res.json({
        status: 'success',
        data: { url }
      });

    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
);

//<<<<<<< HEAD
// Dashboard

// Dashboard
//>>>>>>> 477ee8ab094f306a06e6ef18526d5b2bc95daed1
router.get('/dashboard', protect, staffAndAbove, miscCtrl.getDashboardKPIs);

// Investisseurs
router.get('/investors',        protect, staffAndAbove, miscCtrl.getAllInvestors);
router.get('/investors/:id',    protect, staffAndAbove, miscCtrl.getInvestorById);
router.post('/investors',       protect, adminOnly, validate(createInvestorSchema), miscCtrl.createInvestor);
router.patch('/investors/:id',  protect, adminOnly, validate(updateInvestorSchema), miscCtrl.updateInvestor);
router.delete('/investors/:id', protect, adminOnly, miscCtrl.deleteInvestor);

//  Contacts
router.post('/contacts',             validate(createContactSchema), miscCtrl.createContact);
router.get('/contacts',              protect, staffAndAbove, miscCtrl.getAllContacts);
router.get('/contacts/export',       protect, staffAndAbove, miscCtrl.exportContactsCSV);
router.get('/contacts/:id',          protect, staffAndAbove, miscCtrl.getContactById);
router.patch('/contacts/:id',        protect, staffAndAbove, validate(updateContactSchema), miscCtrl.updateContact);

//Settings
router.get('/settings',              protect, adminOnly, miscCtrl.getAllSettings);
router.get('/settings/:cle',         protect, adminOnly, miscCtrl.getSettingByCle);
router.put('/settings',              protect, adminOnly, validate(upsertSettingSchema), miscCtrl.upsertSetting);
router.delete('/settings/:cle',      protect, adminOnly, miscCtrl.deleteSetting);


//Content Blocks
router.delete('/content/page/:page_slug', protect, adminOnly, miscCtrl.deleteAllContentByPage);
router.put('/content',               protect, adminOnly , miscCtrl.upsertContentBlock);
router.get('/content',    miscCtrl.getAllContentBlocks);
//router.put('/content',               protect, adminOnly, validate(upsertContentBlockSchema), miscCtrl.upsertContentBlock);
router.put('/content/:id',           protect, adminOnly, miscCtrl.upsertContentBlockById);
router.delete('/content/:page_slug/:bloc_key', protect, adminOnly, miscCtrl.deleteContentBlockByKey);
router.delete('/content/:id', protect, adminOnly, miscCtrl.deleteContentBlock);
// Reset theme to default

// Reset theme to default - Supprime TOUS les thèmes
// Reset theme to default - Supprime TOUS les thèmes (global + toutes les pages)
router.post('/theme/reset', protect, adminOnly, async (req, res) => {
  try {
    const { query } = await import('../config/database.js');

    // 🔥 SUPPRIMER TOUS LES THÈMES SANS CONDITION
    const result = await query(
      "DELETE FROM content_blocks WHERE bloc_key IN ('_global_theme', '_theme') RETURNING page_slug, bloc_key"
    );

    console.log(`🗑️ ${result.rows.length} thèmes supprimés:`, result.rows);

    res.json({
      status: 'success',
      message: `${result.rows.length} thèmes supprimés`,
      data: { deleted: result.rows }
    });
  } catch (error) {
    console.error('Erreur reset thèmes:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
router.post('/theme/reset2', protect, adminOnly, async (req, res) => {
  try {
    const { page_slug } = req.body;

    // Supprimer le thème personnalisé pour cette page
    await query(
      'DELETE FROM content_blocks WHERE page_slug = $1 AND bloc_key = $2',
      [page_slug || '__global__', '_theme']
    );

    // Pour le thème global
    if (page_slug === '__global__') {
      await query(
        'DELETE FROM content_blocks WHERE page_slug = $1 AND bloc_key = $2',
        ['__global__', '_global_theme']
      );
    }

    res.json({
      status: 'success',
      message: 'Thème réinitialisé aux valeurs par défaut'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});


// Public lu par EventsPage côté client
router.get('/announcements/public', miscCtrl.getPublicAnnouncements);

// Admin (avec auth)
router.get('/announcements',          protect, staffAndAbove, miscCtrl.getAllAnnouncements);
router.get('/announcements/:id',      protect, staffAndAbove, miscCtrl.getAnnouncementById);
router.post('/announcements',         protect, adminOnly, miscCtrl.createAnnouncement);
router.patch('/announcements/:id',    protect, adminOnly, miscCtrl.updateAnnouncement);
router.delete('/announcements/:id',   protect, adminOnly, miscCtrl.deleteAnnouncement);

// equipes

//  lu par TeamSection/EventsPage côté client
router.get('/team/public', miscCtrl.getPublicTeamMembers);

// Admin (avec auth)
router.get('/team',          protect, staffAndAbove, miscCtrl.getAllTeamMembers);
 router.get('/team/:id',      protect, staffAndAbove, miscCtrl.getTeamMemberById);
router.post('/team',         protect, adminOnly, miscCtrl.createTeamMember);
router.patch('/team/:id',    protect, adminOnly, miscCtrl.updateTeamMember);
router.delete('/team/:id',   protect, adminOnly, miscCtrl.deleteTeamMember);

// newsletter:

// Newsletter (public)
router.post('/newsletter/subscribe', miscCtrl.subscribeToNewsletter);

// Admin routes
router.get('/newsletter/subscribers', protect, staffAndAbove, miscCtrl.getAllNewsletterSubscribers);
router.get('/newsletter/count', protect, staffAndAbove, miscCtrl.getNewsletterCount);
router.post('/newsletter/send', protect, adminOnly, miscCtrl.sendNewsletter);


export const systemRoutes = router ;
