import { inject, injectable } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
}

@injectable()
class SendMailContactService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute({ name, email, whatsapp, subject }: IRequest): Promise<void> {
    const contactTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'contact.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: 'Portfólio',
        email: 'maxpb777@gmail.com',
      },
      subject: 'Messagem do Portfólio',
      templateData: {
        file: contactTemplate,
        variables: {
          name,
          email,
          whatsapp,
          subject,
        },
      },
    });
  }
}

export default SendMailContactService;
