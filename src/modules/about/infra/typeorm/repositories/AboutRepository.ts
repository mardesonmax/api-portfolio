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

  async save(about: About): Promise<About> {
    return this.ormRepository.save(about);
  }

  async findByUserId(user_id: string): Promise<About[] | undefined> {
    return this.ormRepository.find({
      where: { user_id },
    });
  }

  async findAll(): Promise<About[]> {
    return this.ormRepository.find({
      order: { created_at: 'ASC' },
    });
  }

  async findById(id: string): Promise<About | undefined> {
    return this.ormRepository.findOne({ id });
  }

  async delete(about: About): Promise<void> {
    await this.ormRepository.remove(about);
  }
}

export default AboutRepository;
