import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AboutController from '../controllers/AboutController';

const aboutController = new AboutController();

const aboutRouter = Router();

aboutRouter.post('/', ensureAuthenticated, aboutController.create);

export default aboutRouter;
