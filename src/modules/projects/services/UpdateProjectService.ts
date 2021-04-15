import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import formatBaseUrl from '@config/formatBaseUrl';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
  title: string;
  description: string;
  link_code?: string;
  link_project?: string;
  status?: boolean;
  user_id: string;
  base_url?: string;
}

@injectable()
class UpdateProjectService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({
    id,
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

    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project does not exist');
    }

    if (title !== project.title) {
      const formateTitleBaseUrl = formatBaseUrl(title);
      const baseUrl = await this.projectsRepository.findByBaseUrl({
        base_url: formateTitleBaseUrl,
        admin: true,
      });

      if (baseUrl && baseUrl.id !== project.id) {
        throw new AppError('title already registered');
      }
    }

    await this.cacheProvider.invalidate(`project-item:${project.base_url}`);

    Object.assign(project, {
      title,
      description,
      link_code,
      link_project,
      status,
    });

    const upProject = await this.projectsRepository.save(project);

    await this.cacheProvider.invalidate('projects-list');

    return classToClass(upProject);
  }
}

export default UpdateProjectService;
