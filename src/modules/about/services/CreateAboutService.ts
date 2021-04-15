import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateAboutDTO from '../dtos/ICreateAboutDTO';
import About from '../infra/typeorm/entities/About';
import IAboutRepository from '../repositories/IAboutRepository';

@injectable()
class CreateAboutService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AboutRepository')
    private aboutRepository: IAboutRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({
    user_id,
    title,
    description,
  }: ICreateAboutDTO): Promise<About> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const about = await this.aboutRepository.create({
      user_id,
      title,
      description,
    });

    await this.cacheProvider.invalidate('abouts-list');

    return about;
  }
}

export default CreateAboutService;
