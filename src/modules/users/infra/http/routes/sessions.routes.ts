import { Router } from 'express';
import UserSessionController from '../controllers/UserSessionController';

const sessionsRouter = Router();
const userSessionController = new UserSessionController();

sessionsRouter.post('/', userSessionController.create);

export default sessionsRouter;
