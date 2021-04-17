import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    const userAvatar = await updateUserAvatar.execute({
      user_id: user.id,
      avatar: 'avatar.png',
    });

    expect(userAvatar.avatar).toBe('avatar.png');
  });

  it('should be able to update user avatar and delete old avatar', async () => {
    const spy = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar: 'avatar.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar: 'avatar2.png',
    });

    expect(spy).toHaveBeenCalledWith('avatar.png');
  });

  it('should not be able to update user avatar', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'undefined',
        avatar: 'avatar.png',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
