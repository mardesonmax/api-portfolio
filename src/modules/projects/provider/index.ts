import { container } from 'tsyringe';
import ProjectsRepository from '../infra/typeorm/repositories/ProjectsRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectRepository',
  ProjectsRepository
);
