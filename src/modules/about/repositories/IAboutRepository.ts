import ICreateAboutDTO from '../dtos/ICreateAboutDTO';
import About from '../infra/typeorm/entities/About';

export default interface IAboutRepository {
  create(props: ICreateAboutDTO): Promise<About>;
}
