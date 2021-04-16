import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
// import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import DeleteProjectService from '../services/DeleteProjectService';

let deleteProject: DeleteProjectService;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('DeleteProjectService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCacheProvider = new FakeCacheProvider();

    deleteProject = new DeleteProjectService(
      fakeUsersRepository,
      fakeProjectsRepository,
      fakeStorageProvider,
      fakeCacheProvider
    );
  });

  it('must be able to delete a project with an image', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    const spy = jest.spyOn(fakeProjectsRepository, 'delete');

    const project = await fakeProjectsRepository.create({
      title: 'New Project',
      description: 'Description and project',
      status: true,
      users: [user],
    });

    Object.assign(project, {
      image: {
        id: '123456',
        filename: 'image.png',
      },
    });

    await deleteProject.execute({
      user_id: user.id,
      proj_id: project.id,
    });

    expect(spy).toHaveBeenCalledWith(project);
  });

  it('must be able to delete a project with not image', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    const spy = jest.spyOn(fakeProjectsRepository, 'delete');

    const project = await fakeProjectsRepository.create({
      title: 'New Project',
      description: 'Description and project',
      status: true,
      users: [user],
    });

    await deleteProject.execute({
      user_id: user.id,
      proj_id: project.id,
    });

    expect(spy).toHaveBeenCalledWith(project);
  });

  it('should not be able to delete a project with an unauthenticated user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    const project = await fakeProjectsRepository.create({
      title: 'New Project',
      description: 'Description and project',
      status: true,
      users: [user],
    });

    await expect(
      deleteProject.execute({
        user_id: 'undefined',
        proj_id: project.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a project does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    await expect(
      deleteProject.execute({
        user_id: user.id,
        proj_id: 'undefined',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
