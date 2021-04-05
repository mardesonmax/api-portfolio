import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class ShowProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  async execute(base_url: string): Promise<Project | undefined> {
    const project = await this.projectsRepository.findByBaseUrl(base_url);

    return classToClass(project);
  }
}

export default ShowProjectService;
