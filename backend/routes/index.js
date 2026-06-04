import { Router } from 'express';
import {authRoutes}        from './auth.js';
import {reservationRoutes} from './reservation.js';
import {candidatureRoutes} from './candidature.js';
import {formationRoutes}   from './formation.js';
import {systemRoutes}        from './system.js';

const router = Router();

router.use('/auth',          authRoutes);
router.use('/reservations',  reservationRoutes);
router.use('/candidatures',  candidatureRoutes);
router.use('/formations',    formationRoutes);
router.use('/system',              systemRoutes);  // dashboard, investors, contacts, settings, content, upload

export default router;
