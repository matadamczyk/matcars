import { authenticateToken, checkRole } from '../middleware/auth';
import {
    createKlient,
    deleteKlient,
    getKlienci,
    getKlient,
    updateKlient
} from '../controllers/klient.controller';

import { Router } from 'express';

const router = Router();

// Publiczne endpointy
router.get('/', getKlienci);
router.get('/:id', getKlient);

// Chronione endpointy (tylko dla admina)
router.post('/', authenticateToken, checkRole(['admin']), createKlient);
router.put('/:id', authenticateToken, checkRole(['admin']), updateKlient);
router.delete('/:id', authenticateToken, checkRole(['admin']), deleteKlient);

export default router;