import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAboutRepository from '../repositories/IAboutRepository';

interface IRequest {
  user_id: string;
  about_id: string;
}

@injectable()
class DeleteAboutService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AboutRepository')
    private aboutRepository: IAboutRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ user_id, about_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const about = await this.aboutRepository.findById(about_id);

    if (!about || about.user_id !== user_id) {
      throw new AppError('About does not exist');
    }

    await this.aboutRepository.delete(about);
    await this.cacheProvider.invalidate('abouts-list');
  }
}

export default DeleteAboutService;
