import { getRepository, Repository } from 'typeorm';

import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

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
    return this.ormRepository.find({
      relations: ['image'],
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne({ where: { id }, relations: ['image'] });
  }

  async findByBaseUrl(base_url: string): Promise<Project | undefined> {
    return this.ormRepository.findOne({
      where: { base_url },
      relations: ['image'],
    });
  }

  async remove(project: Project): Promise<void> {
    await this.ormRepository.remove(project);
  }
}

export default ProjectsRepository;
