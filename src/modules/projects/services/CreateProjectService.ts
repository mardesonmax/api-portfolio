import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectRepository')
    private projectRepository: IProjectsRepository
  ) {}

  async execute({
    title,
    description,
    link_code,
    link_project,
    base_url,
    status,
  }: ICreateProjectDTO): Promise<Project> {
    const titleExit = await this.projectRepository.findByTitle(title);

    if (titleExit) {
      throw new AppError('title already registered');
    }

    const project = await this.projectRepository.create({
      title,
      description,
      link_code,
      link_project,
      base_url,
      status,
    });

    return project;
  }
}

export default CreateProjectService;
