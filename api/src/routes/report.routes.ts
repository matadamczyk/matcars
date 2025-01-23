import { getActiveRentals, getCarAvailability, getRentalStatistics } from '../controllers/report.controller';

import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/active-rentals', authenticateToken, getActiveRentals);
router.get('/car-availability', authenticateToken, getCarAvailability);
router.get('/rental-statistics', authenticateToken, getRentalStatistics);

export default router;