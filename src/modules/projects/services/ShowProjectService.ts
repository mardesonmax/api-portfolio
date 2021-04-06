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
    private projectsRepository: IProjectsRepository
  ) {}

  async execute({ base_url, admin }: IRequest): Promise<Project | undefined> {
    const project = await this.projectsRepository.findByBaseUrl({
      base_url,
      admin,
    });

    if (!project) {
      throw new AppError('Project does not exist');
    }

    return classToClass(project);
  }
}

export default ShowProjectService;
