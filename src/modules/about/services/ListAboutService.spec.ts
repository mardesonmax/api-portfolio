import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
// import AppError from '@shared/errors/AppError';
import FakeAboutRepository from '../repositories/fakes/FakeAboutRepository';
import ListAboutService from './ListAboutService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAboutRepository: FakeAboutRepository;
let listAboutService: ListAboutService;

describe('ListAboutService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAboutRepository = new FakeAboutRepository();

    listAboutService = new ListAboutService(fakeAboutRepository);
  });

  it('Should be able list about me', async () => {
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
});
