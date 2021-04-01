import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class ListProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  async execute(): Promise<Project[] | undefined> {
    const projects = await this.projectsRepository.findAll();

    return classToClass(projects);
  }
}

export default ListProjectService;
