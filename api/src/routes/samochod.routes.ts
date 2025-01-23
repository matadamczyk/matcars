import { authenticateToken, checkRole } from '../middleware/auth.middleware';
import {
    createSamochod,
    deleteSamochod,
    getFilteredSamochody,
    getSamochod,
    getSamochody,
    sortSamochody,
    updateSamochod
} from '../controllers/samochod.controller';

import { Router } from 'express';

const router = Router();

router.get('/sort', sortSamochody); 
router.get('/search', getFilteredSamochody);
router.get('/:id', getSamochod);
router.get('/', getSamochody);

router.post('/', authenticateToken, checkRole(['admin']), createSamochod);
router.put('/:id', authenticateToken, checkRole(['admin']), updateSamochod);
router.delete('/:id', authenticateToken, checkRole(['admin']), deleteSamochod);

export default router;