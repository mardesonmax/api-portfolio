import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';
import UpdateProjectImagesController from '../controllers/UpdateProjectImagesController';

const projectsController = new ProjectsController();
const updateProjectImagesController = new UpdateProjectImagesController();

const projectsRouter = Router();

const upload = multer(uploadConfig.multer);

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
  updateProjectImagesController.create
);

projectsRouter.get('/:base_url', projectsController.show);

projectsRouter.get('/', projectsController.index);

export default projectsRouter;
