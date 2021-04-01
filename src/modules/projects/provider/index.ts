import { container } from 'tsyringe';
import ProjectImagesRepository from '../infra/typeorm/repositories/ProjectImagesRepository';
import ProjectsRepository from '../infra/typeorm/repositories/ProjectsRepository';
import IProjectImagesRepository from '../repositories/IProjectImagesRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository
);

container.registerSingleton<IProjectImagesRepository>(
  'ProjectImagesRepository',
  ProjectImagesRepository
);
