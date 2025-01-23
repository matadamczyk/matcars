import { getRole, getRoles } from '../controllers/role.controller';

import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getRoles);
router.get('/:id', authenticateToken, getRole);

export default router;