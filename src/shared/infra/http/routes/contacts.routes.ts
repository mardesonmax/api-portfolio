import { Router } from 'express';

import ContactsController from '../controllers/ContactsCrontroller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const contactsController = new ContactsController();

const contactRouter = Router();

contactRouter.get('/', contactsController.show);
contactRouter.post('/', ensureAuthenticated, contactsController.create);

export default contactRouter;
