import { Router } from 'express';
import AboutController from '../controllers/AboutController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const aboutController = new AboutController();

const aboutRouter = Router();

aboutRouter.post('/', ensureAuthenticated, aboutController.create);

export default aboutRouter;
