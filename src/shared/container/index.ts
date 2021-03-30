import { container } from 'tsyringe';

import '@modules/users/provider';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ContactsRepository from '@modules/users/infra/typeorm/repositories/ContactsRepository';
import IContactsRepository from '@modules/users/repositories/IContactsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
);
