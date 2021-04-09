import IUsersRepository from '@modules/users/repositories/IUsersRepository';
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
    private aboutRepository: IAboutRepository
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
  }
}

export default DeleteAboutService;
