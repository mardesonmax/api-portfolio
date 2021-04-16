import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '../services/CreateProjectService';
import UpdateProjectImageService from '../services/UpdateProjectImageService';
import FakeProjectImagesRepository from '../repositories/fakes/FakeProjectImagesRepository';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeProjectImagesRepository: FakeProjectImagesRepository;
let updateProjectImage: UpdateProjectImageService;
let fakeUsersRepository: FakeUsersRepository;
let createProject: CreateProjectService;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateProjectImageService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeProjectImagesRepository = new FakeProjectImagesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createProject = new CreateProjectService(
      fakeUsersRepository,
      fakeProjectsRepository,
      fakeCacheProvider
    );

    updateProjectImage = new UpdateProjectImageService(
      fakeProjectsRepository,
      fakeProjectImagesRepository,
      fakeStorageProvider
    );
  });

  it('should not be able create image on project invalid', async () => {
    await expect(
      updateProjectImage.execute({
        filename: 'image.png',
        proj_id: 'invalid_project',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able create image on project', async () => {
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

    const projectImage = await updateProjectImage.execute({
      filename: 'image.png',
      proj_id: project.id,
    });

    expect(projectImage).toHaveProperty('id');
  });

  it('should be able update image on project', async () => {
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

    const image = await updateProjectImage.execute({
      filename: 'image_2.png',
      proj_id: project.id,
    });

    Object.assign(project, { image: { ...image } });

    await fakeProjectsRepository.save(project);

    const projectImage = await updateProjectImage.execute({
      filename: 'image_2.png',
      proj_id: project.id,
    });

    expect(projectImage.filename).toBe('image_2.png');
  });
});
