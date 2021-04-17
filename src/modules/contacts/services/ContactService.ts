import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import ICreateContactDTO from '../dtos/ICreateContactDTO';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class ContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(data: ICreateContactDTO): Promise<Contact | undefined> {
    const contactExist = await this.contactsRepository.findByUserId(
      data.user_id
    );

    if (contactExist) {
      const newContact = {
        ...contactExist,
        ...data,
      };

      await this.contactsRepository.save(newContact);

      await this.cacheProvider.save('contact-show', newContact);
      return newContact;
    }

    const contact = await this.contactsRepository.create(data);

    await this.cacheProvider.save('contact-show', contact);

    return contact;
  }
}

export default ContactService;
