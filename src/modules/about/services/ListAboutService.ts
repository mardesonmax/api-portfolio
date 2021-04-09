import { inject, injectable } from 'tsyringe';
import About from '../infra/typeorm/entities/About';
import IAboutRepository from '../repositories/IAboutRepository';

@injectable()
class ListAboutService {
  constructor(
    @inject('AboutRepository')
    private aboutRepository: IAboutRepository
  ) {}

  async execute(): Promise<About[] | undefined> {
    const about = await this.aboutRepository.findAll();

    return about;
  }
}

export default ListAboutService;
