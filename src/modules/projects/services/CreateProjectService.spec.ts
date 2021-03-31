import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

let createProject: CreateProjectService;
let fakeProjectRepository: FakeProjectsRepository;

describe('CreateProjectService', () => {
  beforeEach(() => {
    fakeProjectRepository = new FakeProjectsRepository();
    createProject = new CreateProjectService(fakeProjectRepository);
  });

  it('should be able create a new project', async () => {
    const project = await createProject.execute({
      title: 'New Project',
      description: 'Description and project',
      status: true,
    });

    expect(project).toHaveProperty('id');
  });

  it('should not be able create a new project weth title in used', async () => {
    await createProject.execute({
      title: 'New Project',
      description: 'Description and project',
      status: true,
    });

    await expect(
      createProject.execute({
        title: 'New Project',
        description: 'Description and project',
        status: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
