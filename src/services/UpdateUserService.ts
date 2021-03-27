import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { AppError } from '../errors/AppError';

import { User } from '../models/User';

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  async execute({ id, name, email, password }: UserProps): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const passwordHash = bcrypt.hashSync(password, 8);

    user.name = name;
    user.email = email;
    user.password = passwordHash;

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export { UpdateUserService };
