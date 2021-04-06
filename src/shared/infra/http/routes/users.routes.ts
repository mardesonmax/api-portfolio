import { Router } from 'express';
import UsersController from '../controllers/UsersCrontroller';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', usersController.update);

export default usersRouter;
