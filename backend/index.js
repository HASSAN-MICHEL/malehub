import { Router } from 'express';
import authRoutes        from './auth.routes.js';
import reservationRoutes from './reservation.routes.js';
import candidatureRoutes from './candidature.routes.js';
import formationRoutes   from './formation.routes.js';
import miscRoutes        from './misc.routes.js';

const router = Router();

router.use('/auth',          authRoutes);
router.use('/reservations',  reservationRoutes);
router.use('/candidatures',  candidatureRoutes);
router.use('/formations',    formationRoutes);
router.use('/',              miscRoutes);  // dashboard, investors, contacts, settings, content, upload

export default router;