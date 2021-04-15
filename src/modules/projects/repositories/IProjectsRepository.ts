import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import IFindByBaseUrlDTO from '../dtos/IFindByBaseUrlDTO';
import Project from '../infra/typeorm/entities/Project';

export default interface IProjectsRepository {
  create(projectDate: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  findAll(admin?: boolean): Promise<Project[]>;
  findById(proj_id: string): Promise<Project | undefined>;
  findByBaseUrl(params: IFindByBaseUrlDTO): Promise<Project | undefined>;
  delete(project: Project): Promise<void>;
}
