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

  async findById(project_id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne(project_id);
  }

  async findByTitle(title: string): Promise<Project | undefined> {
    return this.ormRepository.findOne({
      where: { title },
    });
  }
}

export default ProjectsRepository;
