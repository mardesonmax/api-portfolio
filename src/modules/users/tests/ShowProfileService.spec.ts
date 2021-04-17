import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from '../services/ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    showProfileService = new ShowProfileService(
      fakeUserRepository,
      fakeCacheProvider
    );
  });

  it('should be able to show profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    const showUser = await showProfileService.execute(user.id);

    expect(showUser?.id).toBe(user.id);
  });

  it('should be able to show profile in the cache', async () => {
    const spy = jest.spyOn(fakeCacheProvider, 'save');

    const user = await fakeUserRepository.create({
      name: 'Test User',
      email: 'test@email.com',
      password: '123456',
    });

    await showProfileService.execute(user.id);
    await showProfileService.execute(user.id);
    await showProfileService.execute(user.id);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not be able to show the profile without authentication', async () => {
    await expect(
      showProfileService.execute('undefined')
    ).rejects.toBeInstanceOf(AppError);
  });
});
