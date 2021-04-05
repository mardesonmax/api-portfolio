import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import removeFile from '@config/removeFile';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IProjectImagesRepository from '../repositories/IProjectImagesRepository';
import ProjectImage from '../infra/typeorm/entities/ProjectImage';

interface IRequest {
  filename: string;
  proj_id: string;
  url?: string;
}

@injectable()
class CreateProjectImageService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('ProjectImagesRepository')
    private projectImagesRepository: IProjectImagesRepository
  ) {}

  async execute({ proj_id, filename, url }: IRequest): Promise<ProjectImage> {
    const project = await this.projectsRepository.findById(proj_id);

    if (!project) {
      removeFile(filename);
      throw new AppError('Project does not exist');
    }

    if (project.image) {
      const oldFile = project.image.filename;

      Object.assign(project.image, {
        filename,
        url,
      });

      const upImage = await this.projectImagesRepository.save(project.image);
      removeFile(oldFile);

      return classToClass(upImage);
    }

    const projectImage = await this.projectImagesRepository.create({
      filename,
      url,
      proj_id,
    });

    return classToClass(projectImage);
  }
}

export default CreateProjectImageService;
