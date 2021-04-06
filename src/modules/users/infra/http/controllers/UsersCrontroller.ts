import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateUserService from '@modules/users/services/UpdateUserService';

class UsersController {
  async update(request: Request, response: Response): Promise<Response> {
    const {
      body: { name, email, password },
      user: { id },
    } = request;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

export default UsersController;
