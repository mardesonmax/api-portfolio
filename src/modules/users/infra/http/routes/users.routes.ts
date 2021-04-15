import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersCrontroller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      confirm_new_password: Joi.when('new_password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('new_password')).required(),
      }),
    },
  }),
  usersController.update
);

export default usersRouter;
