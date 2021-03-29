import { Router } from 'express';

import sessionRoutes from './sessions.routes';
import userRoutes from './users.routes';
import contactsRouter from './contacts.routes';

const routes = Router();

routes.use('/session', sessionRoutes);

routes.use('/users', userRoutes);

routes.use('/contacts', contactsRouter);

export default routes;
