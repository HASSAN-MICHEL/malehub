

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
//
const router = Router();

// ── Dashboard 
router.get('/dashboard', protect, staffAndAbove, miscCtrl.getDashboardKPIs);

// ── Investisseurs 
router.get('/investors',        protect, staffAndAbove, miscCtrl.getAllInvestors);
router.get('/investors/:id',    protect, staffAndAbove, miscCtrl.getInvestorById);
router.post('/investors',       protect, adminOnly, validate(createInvestorSchema), miscCtrl.createInvestor);
router.patch('/investors/:id',  protect, adminOnly, validate(updateInvestorSchema), miscCtrl.updateInvestor);
router.delete('/investors/:id', protect, adminOnly, miscCtrl.deleteInvestor);

// ── Contacts 
router.post('/contacts',             validate(createContactSchema), miscCtrl.createContact); 
router.get('/contacts',              protect, staffAndAbove, miscCtrl.getAllContacts);
router.get('/contacts/export',       protect, staffAndAbove, miscCtrl.exportContactsCSV);
router.get('/contacts/:id',          protect, staffAndAbove, miscCtrl.getContactById);
router.patch('/contacts/:id',        protect, staffAndAbove, validate(updateContactSchema), miscCtrl.updateContact);

// ── Settings 
router.get('/settings',              protect, adminOnly, miscCtrl.getAllSettings);
router.get('/settings/:cle',         protect, adminOnly, miscCtrl.getSettingByCle);
router.put('/settings',              protect, adminOnly, validate(upsertSettingSchema), miscCtrl.upsertSetting);
router.delete('/settings/:cle',      protect, adminOnly, miscCtrl.deleteSetting);

// ── Content Blocks

router.get('/content',    miscCtrl.getAllContentBlocks);
router.put('/content',               protect, adminOnly, validate(upsertContentBlockSchema), miscCtrl.upsertContentBlock);
router.put('/content/:id',           protect, adminOnly, miscCtrl.upsertContentBlockById);
router.delete('/content/:id',        protect, adminOnly, miscCtrl.deleteContentBlock);

// ── Upload 

router.post(
  '/upload',
  protect,
  adminOnly,
  (req, _res, next) => { req.uploadSubDir = 'media'; next(); },
  upload.single('file'),
  (req, res) => res.json({ status: 'success', data: { url: `/uploads/media/${req.file.filename}` } })
);

// ICI on construit le chemin del'image avec le domaine:

// // ── Upload 
// router.post(
//   '/upload',
//   protect,
//   adminOnly,
//   (req, _res, next) => { req.uploadSubDir = 'media'; next(); },
//   upload.single('file'),
//   (req, res) => {
//     // Construire l'URL complète avec le domaine
//     const baseUrl = process.env.VERCEL_URL 
//       ? `https://${process.env.VERCEL_URL}`
//       : (process.env.API_URL || 'https://maleahub.vercel.app');
    
//     const fileUrl = `${baseUrl}/uploads/media/${req.file.filename}`;
//     res.json({ status: 'success', data: { url: fileUrl } });
//   }
// );



// Public (sans auth) — lu par EventsPage côté client
router.get('/announcements/public', miscCtrl.getPublicAnnouncements);

// Admin (avec auth)
router.get('/announcements',          protect, staffAndAbove, miscCtrl.getAllAnnouncements);
router.get('/announcements/:id',      protect, staffAndAbove, miscCtrl.getAnnouncementById);
router.post('/announcements',         protect, adminOnly, miscCtrl.createAnnouncement);
router.patch('/announcements/:id',    protect, adminOnly, miscCtrl.updateAnnouncement);
router.delete('/announcements/:id',   protect, adminOnly, miscCtrl.deleteAnnouncement);

// ── TEAM MEMBERS 

// Public (sans auth) — lu par TeamSection/EventsPage côté client
router.get('/team/public', miscCtrl.getPublicTeamMembers);

// Admin (avec auth)
router.get('/team',          protect, staffAndAbove, miscCtrl.getAllTeamMembers);
 router.get('/team/:id',      protect, staffAndAbove, miscCtrl.getTeamMemberById);
router.post('/team',         protect, adminOnly, miscCtrl.createTeamMember);
router.patch('/team/:id',    protect, adminOnly, miscCtrl.updateTeamMember);
router.delete('/team/:id',   protect, adminOnly, miscCtrl.deleteTeamMember);
export default router;
