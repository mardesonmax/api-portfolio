import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ContactsRepository from '@modules/users/infra/typeorm/repositories/ContactsRepository';
import IContactsRepository from '@modules/users/repositories/IContactsRepository';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvide from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvide);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
);
