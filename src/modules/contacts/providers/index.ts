import { container } from 'tsyringe';

import ContactsRepository from '../infra/typeorm/repositories/ContactsRepository';
import IContactsRepository from '../repositories/IContactsRepository';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
);
