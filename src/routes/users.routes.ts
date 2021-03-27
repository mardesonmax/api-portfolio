import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { UpdateUserService } from '../services/UpdateUserService';

const userRoutes = Router();

userRoutes.use(ensureAuthenticated);

userRoutes.put('/', async (request, response) => {
  const {
    body: { name, email, password },
    user: { id },
  } = request;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({
    id,
    name,
    email,
    password,
  });

  return response.json(user);
});

export default userRoutes;
