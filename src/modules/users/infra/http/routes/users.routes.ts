import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import updateConfig from '@config/upload';
import UsersController from '../controllers/UsersCrontroller';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const update = multer(updateConfig.multer);

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

usersRouter.patch('/', update.single('avatar'), userAvatarController.update);

usersRouter.get('/', usersController.show);

export default usersRouter;
