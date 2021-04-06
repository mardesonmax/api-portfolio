import ICreateContactDTO from '../dtos/ICreateContactDTO';
import Contact from '../infra/typeorm/entities/Contact';

export default interface IContactsRepository {
  create(data: ICreateContactDTO): Promise<Contact>;
  save(contact: Contact): Promise<Contact>;
  findByUserId(user_id: string): Promise<Contact | undefined>;
  findOne(): Promise<Contact | undefined>;
}
