import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  admin?: boolean;
}

@injectable()
class ListProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ admin }: IRequest): Promise<Project[]> {
    let projects = await this.cacheProvider.recover<Project[]>('projects-list');

    if (!projects && !admin) {
      const result = await this.projectsRepository.findAll();

      projects = classToClass(result);

      await this.cacheProvider.save('projects-list', projects);

      return projects;
    }

    return classToClass(await this.projectsRepository.findAll(admin));
  }
}

export default ListProjectService;
