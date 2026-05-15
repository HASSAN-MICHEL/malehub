import { Router } from 'express';
import * as salleCtrl from '../controllers/reservation.js';
import * as resCtrl from '../controllers/reservation.js';
import { protect, staffAndAbove, adminOnly } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
//
import {
  createSalleSchema,
  updateSalleSchema,
  createReservationSchema,
  updateReservationSchema,
} from '../validations/reservation.js';

const router = Router();
router.use(protect);

// ── Salles 
router.get('/salles',          salleCtrl.getAllSalles);
router.get('/salles/:id',      salleCtrl.getSalleById);
router.post('/salles',         adminOnly, validate(createSalleSchema),  salleCtrl.createSalle);
router.patch('/salles/:id',    adminOnly, validate(updateSalleSchema),  salleCtrl.updateSalle);
router.delete('/salles/:id',   adminOnly,                                salleCtrl.deleteSalle);

// ── Réservations ──────────────────────────────────────────────────────────────
router.get('/',                staffAndAbove, resCtrl.getAllReservations);
router.get('/stats',           staffAndAbove, resCtrl.getReservationStats);
router.get('/export/csv',      staffAndAbove, resCtrl.exportReservationsCSV);
router.get('/:id',             staffAndAbove, resCtrl.getReservationById);
router.post('/',               validate(createReservationSchema), resCtrl.createReservation); // can be public
router.patch('/:id',           staffAndAbove, validate(updateReservationSchema), resCtrl.updateReservation);

export default router;
