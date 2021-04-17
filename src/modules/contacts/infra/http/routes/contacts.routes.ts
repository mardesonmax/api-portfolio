import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ContactsController from '../controllers/ContactsCrontroller';

const contactsController = new ContactsController();

const contactRouter = Router();

contactRouter.get('/', contactsController.show);
contactRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      facebook: Joi.string().allow(null, '').default(null),
      twitter: Joi.string().allow(null, '').default(null),
      instagram: Joi.string().allow(null, '').default(null),
      email: Joi.string().allow(null, '').default(null),
      whatsapp: Joi.string().allow(null, '').default(null),
      github: Joi.string().allow(null, '').default(null),
      linkedin: Joi.string().allow(null, '').default(null),
    },
  }),
  ensureAuthenticated,
  contactsController.create
);

export default contactRouter;
