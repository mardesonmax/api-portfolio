import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  admin?: boolean;
}

@injectable()
class ListProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  async execute({ admin }: IRequest): Promise<Project[] | undefined> {
    const projects = await this.projectsRepository.findAll(admin);

    return classToClass(projects);
  }
}

export default ListProjectService;
