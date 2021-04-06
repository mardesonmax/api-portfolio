import { getRepository, Repository } from 'typeorm';

import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IFindByBaseUrlDTO from '@modules/projects/dtos/IFindByBaseUrlDTO';

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

  async findAll(admin = false): Promise<Project[] | undefined> {
    return this.ormRepository.find({
      where: admin
        ? {}
        : {
            status: true,
          },
      order: { created_at: 'DESC' },
      relations: ['image'],
    });
  }

  async findById(id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne({ where: { id }, relations: ['image'] });
  }

  async findByBaseUrl({
    base_url,
    admin,
  }: IFindByBaseUrlDTO): Promise<Project | undefined> {
    return this.ormRepository.findOne({
      where: admin
        ? {
            base_url,
          }
        : {
            base_url,
            status: true,
          },
      relations: ['image'],
    });
  }

  async delete(project: Project): Promise<void> {
    await this.ormRepository.remove(project);
  }
}

export default ProjectsRepository;
