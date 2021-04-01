import formatBaseUrl from '@config/formatBaseUrl';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '../IProjectsRepository';
import FakeProjectImagesRepository from './FakeProjectImagesRepository';

class FakeProjectsRepository implements IProjectsRepository {
  private projects: Project[] = [];

  private fakeProjectImagesRepository: FakeProjectImagesRepository;

  constructor() {
    this.fakeProjectImagesRepository = new FakeProjectImagesRepository();
  }

  async create(projectDate: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, projectDate);

    this.projects.push(project);

    return project;
  }

  async save(project: Project): Promise<Project> {
    const projectIndex = this.projects.findIndex(
      (item) => item.id === project.id
    );

    this.projects[projectIndex] = project;

    return project;
  }

  async findAll(): Promise<Project[] | undefined> {
    return this.projects;
  }

  async findById(project_id: string): Promise<Project | undefined> {
    const project = this.projects.find((item) => item.id === project_id);

    return project;
  }

  async findByBaseUrl(title: string): Promise<Project | undefined> {
    return this.projects.find((item) => formatBaseUrl(item.title) === title);
  }
}

export default FakeProjectsRepository;
