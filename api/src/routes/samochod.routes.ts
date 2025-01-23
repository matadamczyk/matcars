import { authenticateToken, checkRole } from '../middleware/auth';
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

router.get('/', getSamochody);
router.get('/:id', getSamochod);
router.get('/search', getFilteredSamochody);
router.get('/sort', sortSamochody); 

router.post('/', authenticateToken, checkRole(['admin']), createSamochod);
router.put('/:id', authenticateToken, checkRole(['admin']), updateSamochod);
router.delete('/:id', authenticateToken, checkRole(['admin']), deleteSamochod);

export default router;