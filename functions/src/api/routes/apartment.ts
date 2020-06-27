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

apartmentRouter.get(
  '/',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin', 'realtor'] }),
  getApartments
);

apartmentRouter.post('/', createApartment);
apartmentRouter.get('/:id', getApartment);
apartmentRouter.put('/:id', updateApartment);
apartmentRouter.delete('/:id', deleteApartment);

export default apartmentRouter;
