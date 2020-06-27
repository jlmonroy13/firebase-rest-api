import { Router } from 'express';

import apartmentRouter from './routes/apartment';
import authRouter from './routes/auth';
import locationRouter from './routes/location';

const router = Router();

router.use('/apartment', apartmentRouter);
router.use('/location', locationRouter);
router.use('/', authRouter);

export default router;
