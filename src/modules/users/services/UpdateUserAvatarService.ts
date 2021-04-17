import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IUserAvarProps {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar }: IUserAvarProps): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      await this.storageProvider.deleteFile(avatar);
      throw new AppError('User does not authenticated', 401);
    }

    const fileName = await this.storageProvider.saveFile(avatar);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default UpdateUserAvatarService;
