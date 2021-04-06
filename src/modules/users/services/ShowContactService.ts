import { inject, injectable } from 'tsyringe';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class ShowContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute(): Promise<Contact | undefined> {
    return this.contactsRepository.findOne();
  }
}

export default ShowContactService;
