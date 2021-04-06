import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContactsController from '../controllers/ContactsCrontroller';

const contactsController = new ContactsController();

const contactRouter = Router();

contactRouter.get('/', contactsController.show);
contactRouter.post('/', ensureAuthenticated, contactsController.create);

export default contactRouter;
