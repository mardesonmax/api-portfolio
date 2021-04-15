import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
// import AppError from '@shared/errors/AppError';
import FakeAboutRepository from '../repositories/fakes/FakeAboutRepository';
import ListAboutService from './ListAboutService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAboutRepository: FakeAboutRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAboutService: ListAboutService;

describe('ListAboutService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAboutRepository = new FakeAboutRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listAboutService = new ListAboutService(
      fakeAboutRepository,
      fakeCacheProvider
    );
  });

  it('Should be able to list about me', async () => {
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

    const list = await listAboutService.execute();

    expect(list).toMatchObject([about]);
  });

  it('Should be able to list about me in the cache', async () => {
    const spy = jest.spyOn(fakeCacheProvider, 'save');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: '123456',
    });

    await fakeAboutRepository.create({
      user_id: user.id,
      title: 'Title about me',
      description: 'Description about me',
    });

    await listAboutService.execute();
    await listAboutService.execute();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
