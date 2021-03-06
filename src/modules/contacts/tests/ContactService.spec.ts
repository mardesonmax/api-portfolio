import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeContactsRepository from '../repositories/fakes/FakeContactsRepository';
import ContactService from '../services/ContactService';

let fakeContactsRepository: FakeContactsRepository;
let fakeCacheProvider: FakeCacheProvider;
let contactService: ContactService;

describe('ContactUserService', () => {
  beforeEach(() => {
    fakeContactsRepository = new FakeContactsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    contactService = new ContactService(
      fakeContactsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create contact', async () => {
    const contact = await contactService.execute({
      user_id: '123456789',
      email: 'test@email.com',
    });

    expect(contact).toHaveProperty('id');
    expect(contact?.user_id).toEqual('123456789');
    expect(contact?.email).toEqual('test@email.com');
  });

  it('should be able to update contact', async () => {
    const contact = await contactService.execute({
      user_id: '123456789',
      email: 'test@email.com',
    });

    const update = await contactService.execute({
      ...contact,
      user_id: '123456789',
      email: 'test2@email.com',
    });

    expect(update?.id).toEqual(contact?.id);
    expect(update?.user_id).toEqual('123456789');
    expect(update?.email).toEqual('test2@email.com');
  });
});
