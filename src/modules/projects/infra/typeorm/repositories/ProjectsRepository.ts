import { getRepository, Repository } from 'typeorm';

import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import formatBaseUrl from '@config/formatBaseUrl';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  async create(projectDate: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(projectDate);

    await this.ormRepository.save(project);

    return project;
  }

  async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  async findAll(): Promise<Project[] | undefined> {
    return this.ormRepository.find({ relations: ['image'] });
  }

  async findById(id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne({ where: { id }, relations: ['image'] });
  }

  async findByBaseUrl(title: string): Promise<Project | undefined> {
    const base_url = formatBaseUrl(title);
    return this.ormRepository.findOne({
      where: { base_url },
    });
  }
}

export default ProjectsRepository;
