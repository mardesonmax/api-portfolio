import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
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

  async findById(project_id: string): Promise<Project | undefined> {
    return this.projects.find((item) => item.id === project_id);
  }

  async findByTitle(title: string): Promise<Project | undefined> {
    return this.projects.find((item) => item.title === title);
  }
}

export default FakeProjectsRepository;
