import { Router } from 'express';

import apartmentRouter from './routes/apartment';
import authRouter from './routes/auth';

const router = Router();

router.use('/apartment', apartmentRouter);
router.use('/', authRouter);

export default router;
