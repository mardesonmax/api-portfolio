import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProjectsController from '../controllers/ProjectsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProjectImagesController from '../controllers/ProjectImagesController';

const projectsController = new ProjectsController();
const projectImagesController = new ProjectImagesController();

const projectsRouter = Router();

const upload = multer(uploadConfig);

projectsRouter.post('/', ensureAuthenticated, projectsController.create);

projectsRouter.post(
  '/:proj_id',
  ensureAuthenticated,
  projectsController.update
);

projectsRouter.delete(
  '/:proj_id',
  ensureAuthenticated,
  projectsController.delete
);

projectsRouter.patch(
  '/',
  ensureAuthenticated,
  upload.single('image'),
  projectImagesController.create
);

projectsRouter.get('/:base_url', projectsController.show);

projectsRouter.get('/', projectsController.index);

export default projectsRouter;
