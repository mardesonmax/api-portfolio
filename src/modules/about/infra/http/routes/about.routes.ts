import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AboutController from '../controllers/AboutController';

const aboutController = new AboutController();

const aboutRouter = Router();

aboutRouter.get('/', aboutController.index);
aboutRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  aboutController.create
);
aboutRouter.put(
  '/:about_id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      about_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  aboutController.update
);
aboutRouter.delete(
  '/:about_id',
  celebrate({
    [Segments.PARAMS]: {
      about_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  aboutController.delete
);

export default aboutRouter;
