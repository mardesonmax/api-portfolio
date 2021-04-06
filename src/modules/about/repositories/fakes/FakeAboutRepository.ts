import ICreateAboutDTO from '@modules/about/dtos/ICreateAboutDTO';
import About from '@modules/about/infra/typeorm/entities/About';
import IAboutRepository from '../IAboutRepository';

class FakeAboutRepository implements IAboutRepository {
  private abouts: About[] = [];

  async create({
    user_id,
    title,
    description,
  }: ICreateAboutDTO): Promise<About> {
    const about = new About();
    Object.assign(about, {
      user_id,
      title,
      description,
    });

    this.abouts.push(about);

    return about;
  }
}

export default FakeAboutRepository;
