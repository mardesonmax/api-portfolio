import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const user_id = request.user.id;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({ user_id, avatar: filename });

    return response.json(user);
  }
}

export default UserAvatarController;
