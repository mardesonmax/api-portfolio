import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class UserSessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticate = container.resolve(AuthenticateUserService);

    const session = await authenticate.execute({ email, password });

    return response.json(session);
  }
}

export default UserSessionController;
