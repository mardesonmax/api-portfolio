import { Router } from 'express';

import ContactsController from '../controllers/ContactsCrontroller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const contactsRouter = Router();
const contactsController = new ContactsController();

contactsRouter.post('/', ensureAuthenticated, contactsController.create);

export default contactsRouter;
