import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import { inject, injectable } from 'tsyringe';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface UserProps {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: UserProps): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

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

export default AuthenticateUserService;
