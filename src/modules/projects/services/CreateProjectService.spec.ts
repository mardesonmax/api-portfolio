import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

let createProject: CreateProjectService;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateProjectService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createProject = new CreateProjectService(
      fakeUsersRepository,
      fakeProjectsRepository,
      fakeCacheProvider
    );
  });

  it('should be able create a new project', async () => {
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

    expect(project).toHaveProperty('id');
  });

  it('should not be able to create a new project without the user being authenticated', async () => {
    await expect(
      createProject.execute({
        title: 'New Project',
        description: 'Description and project',
        status: true,
        user_id: 'undefined-user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able create a new project weth title in used', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    await createProject.execute({
      title: 'New Project',
      description: 'Description and project',
      base_url: 'new_project',
      status: true,
      user_id: user.id,
    });

    await expect(
      createProject.execute({
        title: 'New Project',
        description: 'Description and project',
        status: true,
        user_id: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
