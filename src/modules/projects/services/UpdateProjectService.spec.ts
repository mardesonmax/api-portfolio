import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import UpdateProjectService from './UpdateProjectService';

let updateProject: UpdateProjectService;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('UpdateProjectService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    updateProject = new UpdateProjectService(
      fakeUsersRepository,
      fakeProjectsRepository
    );
  });

  it('should be able update a project', async () => {
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

    Object.assign(project, {
      title: 'Update Project',
    });

    const upProject = await updateProject.execute({
      ...project,
      user_id: user.id,
    });

    expect(upProject.title).toBe('Update Project');
  });

  it('should not be able update a project with user not authenticated', async () => {
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

    Object.assign(project, {
      title: 'Update Project',
    });

    await expect(
      updateProject.execute({
        ...project,
        user_id: 'undefine-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a project that does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    await expect(
      updateProject.execute({
        id: 'undefined-project',
        title: 'undefined tile',
        description: 'undefined description',
        user_id: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a project with a duplicate title', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    await fakeProjectsRepository.create({
      title: 'New Project 1',
      description: 'Description and project',
      base_url: 'new_project_1',
      status: true,
      users: [user],
    });

    const project = await fakeProjectsRepository.create({
      title: 'New Project 2',
      description: 'Description and project',
      base_url: 'new_project_2',
      status: true,
      users: [user],
    });

    await expect(
      updateProject.execute({
        id: project.id,
        title: 'New Project 1',
        description: 'Description and project',
        user_id: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the project title to uppercase', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    const project = await fakeProjectsRepository.create({
      title: 'New Project 2',
      description: 'Description and project',
      base_url: 'new_project_2',
      status: true,
      users: [user],
    });

    const upProject = await updateProject.execute({
      id: project.id,
      title: 'NEW PROJECT 2',
      description: 'Description and project',
      user_id: user.id,
    });

    expect(upProject.title).toBe('NEW PROJECT 2');
  });
});
