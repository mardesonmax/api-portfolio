import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AboutController from '../controllers/AboutController';

const aboutController = new AboutController();

const aboutRouter = Router();

aboutRouter.get('/', aboutController.index);
aboutRouter.post('/', ensureAuthenticated, aboutController.create);
aboutRouter.put('/:about_id', ensureAuthenticated, aboutController.update);
aboutRouter.delete('/:about_id', ensureAuthenticated, aboutController.delete);

export default aboutRouter;
