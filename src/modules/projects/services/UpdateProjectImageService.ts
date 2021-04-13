import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/provider/StorageProvider/models/IStorageProvider';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IProjectImagesRepository from '../repositories/IProjectImagesRepository';
import ProjectImage from '../infra/typeorm/entities/ProjectImage';

interface IRequest {
  filename: string;
  proj_id: string;
  url?: string;
}

@injectable()
class UpdateProjectImageService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('ProjectImagesRepository')
    private projectImagesRepository: IProjectImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ proj_id, filename, url }: IRequest): Promise<ProjectImage> {
    const project = await this.projectsRepository.findById(proj_id);

    if (!project) {
      await this.storageProvider.deleteFile(filename);
      throw new AppError('Project does not exist');
    }

    if (project.image) {
      const oldFile = project.image.filename;
      const image = await this.storageProvider.saveFile(filename);

      Object.assign(project.image, {
        filename: image,
        url,
      });

      await this.projectImagesRepository.save(project.image);

      await this.storageProvider.deleteFile(oldFile);

      return classToClass(project.image);
    }

    const image = await this.storageProvider.saveFile(filename);

    const projectImage = await this.projectImagesRepository.create({
      filename: image,
      url,
      proj_id,
    });

    return classToClass(projectImage);
  }
}

export default UpdateProjectImageService;
