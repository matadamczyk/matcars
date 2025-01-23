import { authenticateToken, checkRole } from '../middleware/auth';
import {
    createUzytkownik,
    deleteUzytkownik,
    getCurrentUser,
    getUzytkownicy,
    getUzytkownik,
    loginUzytkownik,
    logoutUzytkownik,
    registerUzytkownik,
    updateLastLogin,
    updateUzytkownik
} from '../controllers/uzytkownik.controller';

import { Router } from 'express';

const router = Router();

// Publiczne endpointy
router.post('/login', loginUzytkownik);
router.post('/register', registerUzytkownik);
router.post('/logout', logoutUzytkownik);

// Chronione endpointy
router.get('/current', authenticateToken, getCurrentUser);
router.get('/', authenticateToken, checkRole(['admin']), getUzytkownicy);
router.get('/:id', authenticateToken, checkRole(['admin']), getUzytkownik);
router.post('/', authenticateToken, checkRole(['admin']), createUzytkownik);
router.put('/:id', authenticateToken, checkRole(['admin']), updateUzytkownik);
router.delete('/:id', authenticateToken, checkRole(['admin']), deleteUzytkownik);
router.put('/:id/last-login', authenticateToken, updateLastLogin);

export default router;