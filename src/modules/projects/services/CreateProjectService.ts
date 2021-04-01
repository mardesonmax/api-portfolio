import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import formatBaseUrl from '@config/formatBaseUrl';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  title: string;
  description: string;
  link_code?: string;
  link_project?: string;
  status?: boolean;
  user_id: string;
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  async execute({
    title,
    description,
    link_code,
    link_project,
    status,
    user_id,
  }: IRequest): Promise<Project> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User must be authenticated');
    }

    const base_url = formatBaseUrl(title);
    const titleExit = await this.projectsRepository.findByBaseUrl(base_url);

    if (titleExit) {
      throw new AppError('title already registered');
    }

    const project = await this.projectsRepository.create({
      title,
      description,
      link_code,
      link_project,
      status,
      users: [user],
    });

    return classToClass(project);
  }
}

export default CreateProjectService;
