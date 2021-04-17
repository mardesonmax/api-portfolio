import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class ShowContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(): Promise<Contact | undefined> {
    let contact = await this.cacheProvider.recover<Contact | undefined>(
      'contact-show'
    );

    if (!contact) {
      contact = await this.contactsRepository.findOne();

      await this.cacheProvider.save('contact-show', contact);
    }

    return contact;
  }
}

export default ShowContactService;
