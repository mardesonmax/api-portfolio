import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import Project from '../infra/typeorm/entities/Project';

export default interface IProjectsRepository {
  create(projectDate: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  findById(project_id: string): Promise<Project | undefined>;
  findByTitle(title: string): Promise<Project | undefined>;
}
