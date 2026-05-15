// import { Router } from 'express';
// import * as miscCtrl from '../controllers/system.js';
// import { protect, staffAndAbove, adminOnly } from '../middlewares/auth.js';
// import { validate } from '../middlewares/validate.js';
// import {
//   createInvestorSchema,
//   updateInvestorSchema,
//   createContactSchema,
//   updateContactSchema,
//   upsertSettingSchema,
//   upsertContentBlockSchema,
// } from '../validations/system.js';
// import { upload } from '../config/multer.js';

// const router = Router();

// // ── Dashboard 
// router.get('/dashboard', protect, staffAndAbove, miscCtrl.getDashboardKPIs);

// //  Investisseurs 
// router.get('/investors',        protect, staffAndAbove, miscCtrl.getAllInvestors);
// router.get('/investors/:id',    protect, staffAndAbove, miscCtrl.getInvestorById);
// router.post('/investors',       protect, adminOnly, validate(createInvestorSchema), miscCtrl.createInvestor);
// router.patch('/investors/:id',  protect, adminOnly, validate(updateInvestorSchema), miscCtrl.updateInvestor);
// router.delete('/investors/:id', protect, adminOnly, miscCtrl.deleteInvestor);

// // ── Contact
// router.post('/contacts',             validate(createContactSchema), miscCtrl.createContact); // public
// router.get('/contacts',              protect, staffAndAbove, miscCtrl.getAllContacts);
// router.get('/contacts/export',       protect, staffAndAbove, miscCtrl.exportContactsCSV);
// router.get('/contacts/:id',          protect, staffAndAbove, miscCtrl.getContactById);
// router.patch('/contacts/:id',        protect, staffAndAbove, validate(updateContactSchema), miscCtrl.updateContact);

// // ── Settings
// router.get('/settings',              protect, adminOnly, miscCtrl.getAllSettings);
// router.put('/settings',              protect, adminOnly, validate(upsertSettingSchema), miscCtrl.upsertSetting);
// router.delete('/settings/:cle',      protect, adminOnly, miscCtrl.deleteSetting);

// // ── Content Block
// router.get('/content',               miscCtrl.getAllContentBlocks); // public (used by frontend)
// router.put('/content',               protect, adminOnly, validate(upsertContentBlockSchema), miscCtrl.upsertContentBlock);
// router.delete('/content/:id',        protect, adminOnly, miscCtrl.deleteContentBlock);

// router.post(
//   '/upload',
//   protect,
//   adminOnly,
//   (req, _res, next) => { req.uploadSubDir = 'media'; next(); },
//   upload.single('file'),
//   (req, res) => res.json({ status: 'success', url: `/uploads/media/${req.file.filename}` })
// );

// export default router;


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
router.post('/contacts',             validate(createContactSchema), miscCtrl.createContact); // public
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
// GET /content — public, used by frontend to read content
router.get('/content',               miscCtrl.getAllContentBlocks);
// PUT /content — upsert by (page_slug + bloc_key) — used for new blocks
router.put('/content',               protect, adminOnly, validate(upsertContentBlockSchema), miscCtrl.upsertContentBlock);
// PUT /content/:id — update existing block by id — called when block already exists
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

export default router;
