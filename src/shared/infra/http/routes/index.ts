import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import contactsRouter from './contacts.routes';
import projectsRouter from './projects.routes';

const routes = Router();

routes.use('/session', sessionsRouter);

routes.use('/users', usersRouter);

routes.use('/contacts', contactsRouter);

routes.use('/projects', projectsRouter);

export default routes;
