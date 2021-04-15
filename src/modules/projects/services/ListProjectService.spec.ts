import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';
import ListProjectService from './ListProjectService';

let listProject: ListProjectService;
let createProject: CreateProjectService;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProjectService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProject = new ListProjectService(
      fakeProjectsRepository,
      fakeCacheProvider
    );
    createProject = new CreateProjectService(
      fakeUsersRepository,
      fakeProjectsRepository,
      fakeCacheProvider
    );
  });

  it('should be able list all projects', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    const project = await createProject.execute({
      title: 'New Project',
      description: 'Description and project',
      status: true,
      user_id: user.id,
    });

    const projects = await listProject.execute({ admin: true });

    expect(projects).toMatchObject([project]);
  });

  it('should be able list all projects in the cache', async () => {
    const spy = jest.spyOn(fakeCacheProvider, 'save');

    await listProject.execute({ admin: true });
    await listProject.execute({ admin: true });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
