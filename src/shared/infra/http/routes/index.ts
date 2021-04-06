import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import contactsRouter from '@modules/users/infra/http/routes/contacts.routes';
import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import aboutRouter from '@modules/about/infra/http/routes/about.routes';

const routes = Router();

routes.use('/session', sessionsRouter);

routes.use('/users', usersRouter);

routes.use('/contacts', contactsRouter);

routes.use('/projects', projectsRouter);

routes.use('/about', aboutRouter);

export default routes;
