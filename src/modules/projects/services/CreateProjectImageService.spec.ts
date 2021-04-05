import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';
import CreateProjectImageService from './CreateProjectImageService';
import FakeProjectImagesRepository from '../repositories/fakes/FakeProjectImagesRepository';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeProjectImagesRepository: FakeProjectImagesRepository;
let createProjectImage: CreateProjectImageService;
let fakeUsersRepository: FakeUsersRepository;
let createProject: CreateProjectService;

describe('CreateProjectImageService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeProjectImagesRepository = new FakeProjectImagesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createProject = new CreateProjectService(
      fakeUsersRepository,
      fakeProjectsRepository
    );

    createProjectImage = new CreateProjectImageService(
      fakeProjectsRepository,
      fakeProjectImagesRepository
    );
  });

  it('should not be able create image on project invalid', async () => {
    await expect(
      createProjectImage.execute({
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

    const projectImage = await createProjectImage.execute({
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

    const image = await createProjectImage.execute({
      filename: 'image_2.png',
      proj_id: project.id,
    });

    Object.assign(project, { image: { ...image } });

    await fakeProjectsRepository.save(project);

    const projectImage = await createProjectImage.execute({
      filename: 'image_2.png',
      proj_id: project.id,
    });

    expect(projectImage.filename).toBe('image_2.png');
  });
});
