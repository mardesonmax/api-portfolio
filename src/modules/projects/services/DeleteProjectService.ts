import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  proj_id: string;
  user_id: string;
}

@injectable()
class DeleteProjectService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ proj_id, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User must be authenticated', 401);
    }

    const project = await this.projectsRepository.findById(proj_id);

    if (!project) {
      throw new AppError('Project does not exist');
    }

    await this.projectsRepository.delete(project);

    if (project.image) {
      await this.storageProvider.deleteFile(project.image.filename);
    }

    await this.cacheProvider.invalidate('projects-list');
  }
}

export default DeleteProjectService;
