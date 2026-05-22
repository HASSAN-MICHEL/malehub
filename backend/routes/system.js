

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
import { uploadToSupabase } from '../service/supabase.js';
//
const router = Router();

//  Upload vers Supabase Storage
router.post(
  '/upload',
  protect,
  adminOnly,
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'Aucun fichier' });
      }

      // Upload vers Supabase
      const result = await uploadToSupabase(req.file, 'media');
      
      if (!result.success) {
        return res.status(500).json({ status: 'error', message: result.error });
      }

      res.json({ 
        status: 'success', 
        data: { url: result.url } 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
);

// Dashboard 
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

// ── Content Blocks

router.get('/content',    miscCtrl.getAllContentBlocks);
router.put('/content',               protect, adminOnly, validate(upsertContentBlockSchema), miscCtrl.upsertContentBlock);
router.put('/content/:id',           protect, adminOnly, miscCtrl.upsertContentBlockById);
router.delete('/content/:id',        protect, adminOnly, miscCtrl.deleteContentBlock);

// 

// router.post(
//   '/upload',
//   protect,
//   adminOnly,
//   (req, _res, next) => { req.uploadSubDir = 'media'; next(); },
//   upload.single('file'),
//   (req, res) => res.json({ status: 'success', data: { url: `/uploads/media/${req.file.filename}` } })
// );

// ICI on construit le chemin del'image avec le domaine: pour la production



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
export default router;
