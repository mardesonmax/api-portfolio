import { Router } from 'express';
import UserSessionController from '../controllers/UserSessionController';

const sessionRoutes = Router();
const userSessionController = new UserSessionController();

sessionRoutes.post('/', userSessionController.create);

export default sessionRoutes;
