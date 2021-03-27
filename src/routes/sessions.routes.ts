import { Router } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateUserService();

  const session = await authenticate.execute({ email, password });

  return response.json(session);
});

export default sessionRoutes;
