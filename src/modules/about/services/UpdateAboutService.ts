import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateAboutDTO from '../dtos/IUpdateAboutDTO';
import About from '../infra/typeorm/entities/About';
import IAboutRepository from '../repositories/IAboutRepository';

@injectable()
class UpdateAboutService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AboutRepository')
    private aboutRepository: IAboutRepository
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

    return this.aboutRepository.save(about);
  }
}

export default UpdateAboutService;
