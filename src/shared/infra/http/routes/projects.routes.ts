import { Router } from 'express';

import ProjectsController from '../controllers/ProjectsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const projectsController = new ProjectsController();

const projectsRouter = Router();

projectsRouter.post('/', ensureAuthenticated, projectsController.create);

export default projectsRouter;
