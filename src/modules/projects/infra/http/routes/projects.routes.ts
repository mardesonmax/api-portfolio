import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';
import UpdateProjectImagesController from '../controllers/UpdateProjectImagesController';

const projectsController = new ProjectsController();
const updateProjectImagesController = new UpdateProjectImagesController();

const projectsRouter = Router();

const upload = multer(uploadConfig.multer);

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.boolean().default(false),
      link_code: Joi.string().allow(null, '').default(null),
      link_project: Joi.string().allow(null, '').default(null),
    },
  }),
  ensureAuthenticated,
  projectsController.create
);

projectsRouter.post(
  '/:proj_id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.boolean().default(false),
      link_code: Joi.string().allow(null, '').default(null),
      link_project: Joi.string().allow(null, '').default(null),
    },
    [Segments.PARAMS]: {
      proj_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  projectsController.update
);

projectsRouter.delete(
  '/:proj_id',
  celebrate({
    [Segments.PARAMS]: {
      proj_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  projectsController.delete
);

projectsRouter.patch(
  '/:proj_id',
  celebrate({
    [Segments.PARAMS]: {
      proj_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  upload.single('image'),
  updateProjectImagesController.create
);

projectsRouter.get(
  '/:base_url',
  celebrate({
    [Segments.PARAMS]: {
      base_url: Joi.string().required(),
    },
  }),
  projectsController.show
);

projectsRouter.get('/', projectsController.index);

export default projectsRouter;
