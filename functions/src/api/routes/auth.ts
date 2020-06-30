import { Router } from 'express';

import { signUp, getUsers, getUser, updateUser, deleteUser } from '../controllers/auth';

import { isAuthenticated, isAuthorized } from '../../middlewares';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.get('/user', isAuthenticated, isAuthorized({ hasRole: ['admin'] }), getUsers);
authRouter.get('/user/:id', getUser);
authRouter.put('/user/:id', isAuthenticated, isAuthorized({ hasRole: ['admin'] }), updateUser);
authRouter.delete('/user/:id', isAuthenticated, isAuthorized({ hasRole: ['admin'] }), deleteUser);

export default authRouter;
