import { container } from 'tsyringe';
import AboutRepository from '../infra/typeorm/repositories/AboutRepository';
import IAboutRepository from '../repositories/IAboutRepository';

container.registerSingleton<IAboutRepository>(
  'AboutRepository',
  AboutRepository
);
