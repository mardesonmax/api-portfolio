import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ContactService from '@modules/contacts/services/ContactService';
import ShowContactService from '@modules/contacts/services/ShowContactService';

class ContactsController {
  async show(request: Request, response: Response): Promise<Response> {
    const contactsService = container.resolve(ShowContactService);

    const contact = await contactsService.execute();

    return response.json(contact);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      user,
      body: { facebook, twitter, instagram, email, whatsapp, github, linkedin },
    } = request;

    const contactsService = container.resolve(ContactService);

    const contact = await contactsService.execute({
      user_id: user.id,
      facebook,
      twitter,
      instagram,
      email,
      whatsapp,
      github,
      linkedin,
    });

    return response.status(201).json(contact);
  }
}

export default ContactsController;
