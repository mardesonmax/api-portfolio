import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(user_id: string): Promise<User | undefined> {
    let user = await this.cacheProvider.recover<User | undefined>(
      'show-profile'
    );

    if (!user) {
      user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('Users does not authenticated', 401);
      }

      user = classToClass(user);

      await this.cacheProvider.save('show-profile', user);
    }

    return user;
  }
}

export default ShowProfileService;
