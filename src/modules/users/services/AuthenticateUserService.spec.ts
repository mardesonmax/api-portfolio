import AppError from '@shared/errors/AppError';
import FakeHashProvide from '../provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvide();

    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const result = await authenticateUser.execute({
      email: 'test@email.com',
      password: '123456',
    });

    expect(result).toHaveProperty('token');
    expect(result.user).toEqual(user);
  });

  it('should not be able to authenticate user non exists', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvide();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: 'test@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user on incorrect password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvide();

    await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: 'test@email.com',
        password: 'incorrect-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
