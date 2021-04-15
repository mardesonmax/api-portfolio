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

  async findByUserId(user_id: string): Promise<About[] | undefined> {
    return this.abouts.filter((about) => about.user_id === user_id);
  }

  async findAll(): Promise<About[]> {
    return this.abouts;
  }

  async save(about: About): Promise<About> {
    const aboutIndex = this.abouts.findIndex((find) => find.id === about.id);

    this.abouts[aboutIndex] = about;

    return about;
  }

  async findById(id: string): Promise<About | undefined> {
    return this.abouts.find((about) => about.id === id);
  }

  async delete(about: About): Promise<void> {
    this.abouts = this.abouts.filter((find) => find.id !== about.id);
  }
}

export default FakeAboutRepository;
