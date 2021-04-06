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
  base_url?: string;
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
      throw new AppError('User must be authenticated', 401);
    }

    const base_url = formatBaseUrl(title);
    const titleExit = await this.projectsRepository.findByBaseUrl({
      base_url,
      admin: true,
    });

    if (titleExit) {
      throw new AppError('title already registered', 400);
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
