import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';
import ShowProjectService from './ShowProjectService';

let showProject: ShowProjectService;
let createProject: CreateProjectService;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;

describe('ShowProjectService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    showProject = new ShowProjectService(fakeProjectsRepository);
    createProject = new CreateProjectService(
      fakeUsersRepository,
      fakeProjectsRepository
    );
  });

  it('should be able show project', async () => {
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
      base_url: 'new_project',
    });

    const result = await showProject.execute('new_project');

    expect(result?.id).toBe(project.id);
  });
});
