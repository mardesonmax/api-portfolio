import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeContactsRepository from '../repositories/fakes/FakeContactsRepository';
import ShowContactService from '../services/ShowContactService';

let fakeContacts: FakeContactsRepository;
let fakeCacheProvider: FakeCacheProvider;
let showContactService: ShowContactService;

describe('ShowContactRepository', () => {
  beforeEach(() => {
    fakeContacts = new FakeContactsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    showContactService = new ShowContactService(
      fakeContacts,
      fakeCacheProvider
    );
  });

  it('should be able to show contact', async () => {
    const contact = await fakeContacts.create({
      user_id: '123456',
      email: 'test@email.com',
    });

    const showContact = await showContactService.execute();

    expect(contact.email).toBe(showContact?.email);
  });

  it('should be able to show contact in the cache', async () => {
    const syp = jest.spyOn(fakeCacheProvider, 'save');

    await fakeContacts.create({
      user_id: '123456',
      email: 'test@email.com',
    });

    await showContactService.execute();
    await showContactService.execute();

    expect(syp).toHaveBeenCalledTimes(1);
  });
});
