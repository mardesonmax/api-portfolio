import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, name, email, password }: UserProps): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const passwordHash = bcrypt.hashSync(password, 8);

    user.name = name;
    user.email = email;
    user.password = passwordHash;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserService;
