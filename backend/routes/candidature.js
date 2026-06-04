import { Router } from 'express';
import * as candCtrl from '../controllers/candidature.js';
import { protect, staffAndAbove, mentorAndAbove } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  createCandidatureSchema,
  updateCandidatureSchema,
  createProjetIncubeSchema,
  updateProjetIncubeSchema,
} from '../validations/candidature.js';

const router = Router();

// Candidatures 
router.post('/', validate(createCandidatureSchema), candCtrl.createCandidature);

// Protected routes
router.use(protect);
router.get('/',       staffAndAbove, candCtrl.getAllCandidatures);
router.get('/stats',  staffAndAbove, candCtrl.getCandidatureStats);
router.get('/:id',    staffAndAbove, candCtrl.getCandidatureById);
router.patch('/:id',  staffAndAbove, validate(updateCandidatureSchema), candCtrl.updateCandidature);

// ── Projets Incubés ───────────────────────────────────────────────────────────
router.get('/projets',       mentorAndAbove, candCtrl.getAllProjetsIncubes);
router.get('/projets/:id',   mentorAndAbove, candCtrl.getProjetIncubeById);
router.post('/projets',      staffAndAbove,  validate(createProjetIncubeSchema), candCtrl.createProjetIncube);
router.patch('/projets/:id', mentorAndAbove, validate(updateProjetIncubeSchema), candCtrl.updateProjetIncube);

export const reservationRoutes = router;
