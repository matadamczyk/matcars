import { authenticateToken, checkRole } from '../middleware/auth.middleware';
import {
    createKlient,
    deleteKlient,
    getKlienci,
    getKlient,
    getKlientByEmail,
    getKlientByUserId,
    updateKlient
} from '../controllers/klient.controller';

import { Router } from 'express';

const router = Router();

router.get('/', authenticateToken, getKlienci);
router.get('/:id', authenticateToken, getKlient);
router.get("/email/:email", getKlientByEmail);
router.get("/user/:userId", getKlientByUserId);

router.post('/', authenticateToken, createKlient); 
router.put('/:id', authenticateToken, updateKlient);
router.delete('/:id', authenticateToken, checkRole(['admin']), deleteKlient);

export default router;