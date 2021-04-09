import ICreateAboutDTO from '../dtos/ICreateAboutDTO';
import About from '../infra/typeorm/entities/About';

export default interface IAboutRepository {
  create(props: ICreateAboutDTO): Promise<About>;
  save(about: About): Promise<About>;
  findAll(): Promise<About[] | undefined>;
  findById(id: string): Promise<About | undefined>;
  delete(about: About): Promise<void>;
  findByUserId(user_id: string): Promise<About[] | undefined>;
}
