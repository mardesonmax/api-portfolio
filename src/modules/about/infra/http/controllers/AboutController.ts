import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateAboutService from '@modules/about/services/CreateAboutService';
import ListAboutService from '@modules/about/services/ListAboutService';
import UpdateAboutService from '@modules/about/services/UpdateAboutService';
import DeleteAboutService from '@modules/about/services/DeleteAboutService';

class AboutController {
  async index(request: Request, response: Response): Promise<Response> {
    const listAboutService = container.resolve(ListAboutService);

    const about = await listAboutService.execute();

    return response.json(about);
  }

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

  async update(request: Request, response: Response): Promise<Response> {
    const {
      user,
      params: { about_id },
      body: { title, description },
    } = request;

    const updateAboutService = container.resolve(UpdateAboutService);

    const about = await updateAboutService.execute({
      id: about_id,
      user_id: user.id,
      title,
      description,
    });

    return response.status(201).json(about);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const {
      user,
      params: { about_id },
    } = request;

    const updateAboutService = container.resolve(DeleteAboutService);

    await updateAboutService.execute({
      about_id,
      user_id: user.id,
    });

    return response.status(204).send();
  }
}

export default AboutController;
