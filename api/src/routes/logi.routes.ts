import { Router } from 'express';
import { getLogs } from '../controllers/logi.controller';

const router = Router();

router.get('/', getLogs);

export default router;
