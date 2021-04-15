import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import jwt from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IUserProps {
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
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ email, password }: IUserProps): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email and password combination', 401);
    }

    const passwordVerify = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordVerify) {
      throw new AppError('Incorrect email and password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jtw;

    const token = jwt.sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user: classToClass(user), token };
  }
}

export default AuthenticateUserService;
