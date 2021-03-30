import ICreateContactDTO from '@modules/users/dtos/ICreateContactDTO';
import IContactsRepository from '@modules/users/repositories/IContactsRepository';
import { getRepository, Repository } from 'typeorm';
import Contact from '../entities/Contact';

class ContactsRepository implements IContactsRepository {
  private ormRepository: Repository<Contact>;

  constructor() {
    this.ormRepository = getRepository(Contact);
  }

  async create(data: ICreateContactDTO): Promise<Contact> {
    const contact = this.ormRepository.create(data);
    await this.ormRepository.save(contact);

    return contact;
  }

  async save(contact: Contact): Promise<Contact> {
    await this.ormRepository.save(contact);

    return contact;
  }

  async findByUserId(user_id: string): Promise<Contact | undefined> {
    const contact = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });
    return contact;
  }
}

export default ContactsRepository;
