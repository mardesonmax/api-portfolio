import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import removeFile from '@config/removeFile';
import IProjectsRepository from '../repositories/IProjectsRepository';
// import ProjectImage from '../infra/typeorm/entities/ProjectImage';
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
      const image = {
        ...project.image,
        filename,
        url,
      };

      const upImage = await this.projectImagesRepository.save(image);

      removeFile(project.image.filename);

      return upImage;
    }

    const projectImage = await this.projectImagesRepository.create({
      filename,
      url,
      proj_id,
    });

    return projectImage;
  }
}

export default CreateProjectImageService;
