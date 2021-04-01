import AppError from '@shared/errors/AppError';
import FakeHashProvide from '../provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';

describe('UpdateUserService', () => {
  it('should be able to update user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvide();

    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    const updateUser = new UpdateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const result = await updateUser.execute({
      ...user,
      name: 'Test Update Name',
    });

    expect(result.name).toEqual('Test Update Name');
  });

  it('should not be able to update user non authenticated', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvide();

    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    const updateUser = new UpdateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      updateUser.execute({
        ...user,
        id: 'undefined',
        name: 'Test Update Name',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
