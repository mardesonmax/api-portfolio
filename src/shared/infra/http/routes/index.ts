import { Router } from 'express';

import sessionRoutes from './sessions.routes';
import userRoutes from './users.routes';

const routes = Router();

routes.use('/session', sessionRoutes);

routes.use('/users', userRoutes);

export default routes;
