import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../provider/HashProvider/models/IHashProvider';

interface IUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ id, name, email, password }: IUserProps): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    user.name = name;
    user.email = email;
    user.password = passwordHash;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
