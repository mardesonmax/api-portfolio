import AppError from '@shared/errors/AppError';
import FakeHashProvide from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvide;
let updateUser: UpdateUserService;

describe('UpdateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvide();
    updateUser = new UpdateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to update user name and email', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    const result = await updateUser.execute({
      id: user.id,
      name: 'Test Update Name',
      email: 'test_update@email.com',
    });

    expect(result.name).toEqual('Test Update Name');
    expect(result.email).toEqual('test_update@email.com');
  });

  it('should be able to update user password', async () => {
    const spy = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    await updateUser.execute({
      id: user.id,
      name: 'Test User',
      email: 'test@email.com',
      old_password: '123456',
      new_password: '102030',
    });

    expect(spy).toHaveBeenCalledWith('102030');
  });

  it('should not be able to update the user password without passing the old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        name: 'Test User',
        email: 'test@email.com',
        new_password: '102030',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user password if the old password is invalid', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        name: 'Test User',
        email: 'test@email.com',
        new_password: '102030',
        old_password: 'invalid_password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user non authenticated', async () => {
    expect(
      updateUser.execute({
        id: 'undefined',
        name: 'Test Update Name',
        email: 'test_update@email.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
