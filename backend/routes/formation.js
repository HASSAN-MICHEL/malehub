import { Router } from 'express';
import * as formCtrl from '../controllers/formation.js';
import { protect, staffAndAbove, adminOnly } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  createFormationSchema,
  updateFormationSchema,
  createInscriptionSchema,
  updateInscriptionSchema,
} from '../validations/formation.js';

const router = Router();

// ── Public ────────────────────────────────────────────────────────────────────
router.get('/',     formCtrl.getAllFormations);
router.get('/:id',  formCtrl.getFormationById);

// Public inscription (no auth)
router.post('/:id/inscriptions', validate(createInscriptionSchema), formCtrl.createInscription);

// ── Protected ─────────────────────────────────────────────────────────────────
router.use(protect);
router.post('/',    adminOnly,     validate(createFormationSchema),  formCtrl.createFormation);
router.patch('/:id', staffAndAbove, validate(updateFormationSchema), formCtrl.updateFormation);
router.delete('/:id', adminOnly,                                      formCtrl.deleteFormation);

router.get('/:id/inscriptions',          staffAndAbove, formCtrl.getInscriptionsByFormation);
router.get('/:id/inscriptions/export',   staffAndAbove, formCtrl.exportInscriptionsCSV);
router.patch('/inscriptions/:id',        staffAndAbove, validate(updateInscriptionSchema), formCtrl.updateInscription);

export default router;