import AppError from '@shared/errors/AppError';
import FakeHashProvide from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '../services/AuthenticateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvide;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvide();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    const result = await authenticateUser.execute({
      email: 'test@email.com',
      password: '123456',
    });

    expect(result).toHaveProperty('token');
    expect(result.user.id).toEqual(user.id);
  });

  it('should not be able to authenticate user non exists', async () => {
    expect(
      authenticateUser.execute({
        email: 'test@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user on incorrect password', async () => {
    await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'test@email.com',
        password: 'incorrect-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
