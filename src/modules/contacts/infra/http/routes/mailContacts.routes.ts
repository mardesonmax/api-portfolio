import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import MailContactController from '../controllers/MailContactControler';

const mailContactController = new MailContactController();

const mailContactRouter = Router();

mailContactRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required(),
      subject: Joi.string().required(),
    },
  }),
  mailContactController.create
);

export default mailContactRouter;
