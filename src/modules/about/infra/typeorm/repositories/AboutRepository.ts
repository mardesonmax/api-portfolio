import ICreateAboutDTO from '@modules/about/dtos/ICreateAboutDTO';
import IAboutRepository from '@modules/about/repositories/IAboutRepository';
import { getRepository, Repository } from 'typeorm';
import About from '../entities/About';

class AboutRepository implements IAboutRepository {
  private ormRepository: Repository<About>;

  constructor() {
    this.ormRepository = getRepository(About);
  }

  async create({
    user_id,
    title,
    description,
  }: ICreateAboutDTO): Promise<About> {
    const about = this.ormRepository.create({
      user_id,
      title,
      description,
    });

    return this.ormRepository.save(about);
  }
}

export default AboutRepository;
