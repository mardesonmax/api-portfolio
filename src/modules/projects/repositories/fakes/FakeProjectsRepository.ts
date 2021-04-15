import formatBaseUrl from '@config/formatBaseUrl';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IFindByBaseUrlDTO from '@modules/projects/dtos/IFindByBaseUrlDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '../IProjectsRepository';

class FakeProjectsRepository implements IProjectsRepository {
  private projects: Project[] = [];

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

  async findAll(): Promise<Project[]> {
    return this.projects;
  }

  async findById(project_id: string): Promise<Project | undefined> {
    const project = this.projects.find((item) => item.id === project_id);

    return project;
  }

  async findByBaseUrl({
    base_url,
  }: IFindByBaseUrlDTO): Promise<Project | undefined> {
    return this.projects.find((item) => formatBaseUrl(item.title) === base_url);
  }

  async delete(project: Project): Promise<void> {
    this.projects = this.projects.filter((item) => item.id !== project.id);
  }
}

export default FakeProjectsRepository;
