import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '../services/CreateProjectService';
import ShowProjectService from '../services/ShowProjectService';

let showProject: ShowProjectService;
let createProject: CreateProjectService;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ShowProjectService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    showProject = new ShowProjectService(
      fakeProjectsRepository,
      fakeCacheProvider
    );
    createProject = new CreateProjectService(
      fakeUsersRepository,
      fakeProjectsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to show project', async () => {
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

    const result = await showProject.execute({ base_url: 'new_project' });

    expect(result?.id).toBe(project.id);
  });

  it('should not be able to show project does not exit', async () => {
    await expect(
      showProject.execute({ base_url: 'undefined' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to show project does not exit', async () => {
    const spy = jest.spyOn(fakeCacheProvider, 'save');

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    await createProject.execute({
      title: 'New Project',
      description: 'Description and project',
      status: true,
      user_id: user.id,
    });

    await showProject.execute({ base_url: 'new_project' });
    await showProject.execute({ base_url: 'new_project' });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
