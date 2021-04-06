import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';
import ListProjectService from './ListProjectService';

let listProject: ListProjectService;
let createProject: CreateProjectService;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;

describe('ListProjectService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listProject = new ListProjectService(fakeProjectsRepository);
    createProject = new CreateProjectService(
      fakeUsersRepository,
      fakeProjectsRepository
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
});
