import ICreateContactDTO from '@modules/users/dtos/ICreateContactDTO';
import Contact from '@modules/users/infra/typeorm/entities/Contact';
import IContactsRepository from '@modules/users/repositories/IContactsRepository';

class FakeContactsRepository implements IContactsRepository {
  find(): Promise<Contact | undefined> {
    throw new Error('Method not implemented.');
  }

  private contacts: Contact[] = [];

  async create(contactData: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, contactData);
    this.contacts.push(contact);
    return contact;
  }

  async save(contact: Contact): Promise<Contact> {
    const contactIndex = this.contacts.findIndex(
      (findContact) => findContact.id === contact.id
    );

    this.contacts[contactIndex] = contact;

    return contact;
  }

  async findByUserId(user_id: string): Promise<Contact | undefined> {
    const contact = this.contacts.find(
      (findContact) => findContact.user_id === user_id
    );

    return contact;
  }

  async findOne(): Promise<Contact | undefined> {
    const contact = this.contacts[0];

    return contact;
  }
}

export default FakeContactsRepository;
