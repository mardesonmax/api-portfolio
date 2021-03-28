import { Router } from 'express';
import UsersController from '../controllers/UsersCrontroller';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.use(ensureAuthenticated);

userRoutes.put('/', usersController.update);

export default userRoutes;
