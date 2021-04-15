import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import About from '../infra/typeorm/entities/About';
import IAboutRepository from '../repositories/IAboutRepository';

@injectable()
class ListAboutService {
  constructor(
    @inject('AboutRepository')
    private aboutRepository: IAboutRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(): Promise<About[]> {
    let abouts = await this.cacheProvider.recover<About[]>('abouts-list');

    if (!abouts) {
      abouts = await this.aboutRepository.findAll();

      await this.cacheProvider.save('abouts-list', abouts);
    }

    return abouts;
  }
}

export default ListAboutService;
