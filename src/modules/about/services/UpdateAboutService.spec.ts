import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeAboutRepository from '../repositories/fakes/FakeAboutRepository';
import UpdateAboutService from './UpdateAboutService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAboutRepository: FakeAboutRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateAboutService: UpdateAboutService;

describe('UpdateAboutService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAboutRepository = new FakeAboutRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updateAboutService = new UpdateAboutService(
      fakeUsersRepository,
      fakeAboutRepository,
      fakeCacheProvider
    );
  });

  it('Should not be able update a new about me with user not authenticated', async () => {
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
      updateAboutService.execute({
        id: about.id,
        user_id: 'undefined',
        title: 'Title about me',
        description: 'Description about me',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update about me does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: '123456',
    });

    await expect(
      updateAboutService.execute({
        id: 'undefined',
        user_id: user.id,
        title: 'Title about me',
        description: 'Description about me',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update about me from another user', async () => {
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
      updateAboutService.execute({
        id: about.id,
        user_id: user2.id,
        title: 'Title about me',
        description: 'Description about me',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update about me', async () => {
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

    const upAbout = await updateAboutService.execute({
      id: about.id,
      user_id: user.id,
      title: 'Title about me',
      description: 'Description about me',
    });

    expect(upAbout.id).toBe(about.id);
  });
});
