import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  base_url: string;
  admin?: boolean;
}

@injectable()
class ShowProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ base_url, admin }: IRequest): Promise<Project | undefined> {
    const projectKey = `project-item:${base_url}`;

    let project = await this.cacheProvider.recover<Project>(projectKey);

    if (!project && !admin) {
      const result = await this.projectsRepository.findByBaseUrl({
        base_url,
      });

      if (!result) {
        throw new AppError('Project does not exist');
      }

      project = classToClass(result);

      await this.cacheProvider.save(projectKey, project);

      return project;
    }

    return classToClass(
      this.projectsRepository.findByBaseUrl({
        base_url,
        admin,
      })
    );
  }
}

export default ShowProjectService;
