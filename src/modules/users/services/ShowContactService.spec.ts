import FakeContactsRepository from '../repositories/fakes/FakeContactsRepository';
import ShowContactService from './ShowContactService';

let fakeContacts: FakeContactsRepository;
let showContactService: ShowContactService;

describe('ShowContactRepository', () => {
  beforeEach(() => {
    fakeContacts = new FakeContactsRepository();
    showContactService = new ShowContactService(fakeContacts);
  });

  it('should be able show contact', async () => {
    const contact = await fakeContacts.create({
      user_id: '123456',
      email: 'test@email.com',
    });

    const showContact = await showContactService.execute();

    expect(contact.email).toBe(showContact?.email);
  });
});
