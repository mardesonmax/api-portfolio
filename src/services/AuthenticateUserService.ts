import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import { User } from '../models/User';
import { AppError } from '../errors/AppError';

interface UserProps {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  async execute({ email, password }: UserProps): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email and password combination', 401);
    }

    const passwordVerify = await compare(password, user.password);

    if (!passwordVerify) {
      throw new AppError('Incorrect email and password combination', 401);
    }

    const token = jwt.sign({}, process.env.SECRET_KEY, {
      subject: user.id,
      expiresIn: process.env.EXPIRED,
    });

    delete user.password;

    return { user, token };
  }
}

export { AuthenticateUserService };
