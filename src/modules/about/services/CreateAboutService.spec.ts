import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeAboutRepository from '../repositories/fakes/FakeAboutRepository';
import CreateAboutService from './CreateAboutService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAboutRepository: FakeAboutRepository;
let createAbout: CreateAboutService;

describe('CreateAboutService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAboutRepository = new FakeAboutRepository();

    createAbout = new CreateAboutService(
      fakeUsersRepository,
      fakeAboutRepository
    );
  });

  it('should be able create a new about me', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: '123456',
    });

    const about = await createAbout.execute({
      user_id: user.id,
      title: 'About me',
      description: 'Description about me',
    });

    expect(about).toHaveProperty('id');
  });

  it('should not be able create a new about me with user no authenticated', async () => {
    await expect(
      createAbout.execute({
        user_id: 'undefined',
        title: 'About me',
        description: 'Description about me',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
