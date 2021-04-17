import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SendMailContactService from '@modules/contacts/services/SendEmailContactService';

class MailContactController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, whatsapp, subject } = request.body;

    const sendMailContact = container.resolve(SendMailContactService);

    await sendMailContact.execute({
      name,
      email,
      whatsapp,
      subject,
    });

    return response.status(204).json();
  }
}

export default MailContactController;
