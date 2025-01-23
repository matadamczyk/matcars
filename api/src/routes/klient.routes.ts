import { authenticateToken, checkRole } from '../middleware/auth.middleware';
import {
    createKlient,
    deleteKlient,
    getKlienci,
    getKlient,
    updateKlient
} from '../controllers/klient.controller';

import { Router } from 'express';

const router = Router();

router.get('/', authenticateToken, getKlienci);
router.get('/:id', authenticateToken, getKlient);

router.post('/', authenticateToken, createKlient); 
router.put('/:id', authenticateToken, checkRole(['admin']), updateKlient);
router.delete('/:id', authenticateToken, checkRole(['admin']), deleteKlient);

export default router;