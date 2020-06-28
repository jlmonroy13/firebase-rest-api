import { Router } from 'express';

import {
  createApartment,
  getApartments,
  getApartment,
  updateApartment,
  deleteApartment,
} from '../controllers/apartment';

// import { isAuthenticated } from '../../middlewares';

const apartmentRouter = Router();

apartmentRouter.get('/', getApartments);
apartmentRouter.post('/', createApartment);
apartmentRouter.get('/:id', getApartment);
apartmentRouter.put('/:id', updateApartment);
apartmentRouter.delete('/:id', deleteApartment);

export default apartmentRouter;
