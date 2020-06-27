import { Router } from 'express';

import { getLocations } from '../controllers/location';

const locationRouter = Router();

locationRouter.get('/', getLocations);

export default locationRouter;
