import { Router } from 'express';

import { signUp, getUsers, getUser, updateUser, deleteUser } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.get('/user', getUsers);
authRouter.get('/user/:id', getUser);
authRouter.put('/user/:id', updateUser);
authRouter.delete('/user/:id', deleteUser);

export default authRouter;
