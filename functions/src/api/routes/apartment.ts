import { Router } from 'express';

import {
  createApartment,
  getApartments,
  getApartment,
  updateApartment,
  deleteApartment,
} from '../controllers/apartment';

import { isAuthenticated, isAuthorized } from '../../middlewares';

const apartmentRouter = Router();

apartmentRouter.get('/', isAuthenticated, getApartments);
apartmentRouter.post(
  '/',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin', 'realtor'] }),
  createApartment,
);
apartmentRouter.get('/:id', isAuthenticated, getApartment);
apartmentRouter.put(
  '/:id',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin', 'realtor'] }),
  updateApartment,
);
apartmentRouter.delete(
  '/:id',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin', 'realtor'] }),
  deleteApartment,
);

export default apartmentRouter;
