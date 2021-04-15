import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IUpdateAboutDTO from '../dtos/IUpdateAboutDTO';
import About from '../infra/typeorm/entities/About';
import IAboutRepository from '../repositories/IAboutRepository';

@injectable()
class UpdateAboutService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AboutRepository')
    private aboutRepository: IAboutRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({
    id,
    user_id,
    title,
    description,
  }: IUpdateAboutDTO): Promise<About> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const about = await this.aboutRepository.findById(id);

    if (!about || about.user_id !== user_id) {
      throw new AppError('About does not exist');
    }

    Object.assign(about, {
      title,
      description,
    });

    await this.cacheProvider.invalidate('abouts-list');

    return this.aboutRepository.save(about);
  }
}

export default UpdateAboutService;
