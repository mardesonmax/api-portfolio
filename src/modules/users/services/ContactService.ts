import { inject, injectable } from 'tsyringe';
import ICreateContactDTO from '../dtos/ICreateContactDTO';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class ContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute(data: ICreateContactDTO): Promise<Contact> {
    const contactExist = await this.contactsRepository.findByUserId(
      data.user_id
    );

    if (contactExist) {
      const newContact = {
        ...contactExist,
        ...data,
      };

      await this.contactsRepository.save(newContact);

      return newContact;
    }

    const contact = await this.contactsRepository.create(data);
    return contact;
  }
}

export default ContactService;
