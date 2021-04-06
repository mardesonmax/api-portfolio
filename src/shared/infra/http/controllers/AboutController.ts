import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateAboutService from '@modules/about/services/CreateAboutService';

class AboutController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      user,
      body: { title, description },
    } = request;

    const aboutService = container.resolve(CreateAboutService);

    const about = await aboutService.execute({
      user_id: user.id,
      title,
      description,
    });

    return response.status(201).json(about);
  }
}

export default AboutController;
