import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeAboutRepository from '../repositories/fakes/FakeAboutRepository';
import DeleteAboutService from './DeleteAboutService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAboutRepository: FakeAboutRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteAboutService: DeleteAboutService;

describe('DeleteAboutService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAboutRepository = new FakeAboutRepository();
    fakeCacheProvider = new FakeCacheProvider();

    deleteAboutService = new DeleteAboutService(
      fakeUsersRepository,
      fakeAboutRepository,
      fakeCacheProvider
    );
  });

  it('Should not be able delete about me with user not authenticated', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: '123456',
    });

    const about = await fakeAboutRepository.create({
      user_id: user.id,
      title: 'Title about me',
      description: 'Description about me',
    });

    await expect(
      deleteAboutService.execute({
        about_id: about.id,
        user_id: 'undefined',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able delete about me does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: '123456',
    });

    await expect(
      deleteAboutService.execute({
        about_id: 'undefined',
        user_id: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete about me from another user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'john_doe_2@email.com',
      password: '123456',
    });

    const about = await fakeAboutRepository.create({
      user_id: user.id,
      title: 'Title about me',
      description: 'Description about me',
    });

    await expect(
      deleteAboutService.execute({
        about_id: about.id,
        user_id: user2.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete about me', async () => {
    const spy = jest.spyOn(fakeAboutRepository, 'delete');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: '123456',
    });

    const about = await fakeAboutRepository.create({
      user_id: user.id,
      title: 'Title about me',
      description: 'Description about me',
    });

    await deleteAboutService.execute({
      about_id: about.id,
      user_id: user.id,
    });

    expect(spy).toHaveBeenCalledWith(about);
  });
});
