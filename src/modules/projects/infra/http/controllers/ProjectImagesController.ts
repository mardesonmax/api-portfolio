import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProjectImageService from '@modules/projects/services/CreateProjectImageService';

class ProjectImagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      body: { proj_id },
      file: { filename },
    } = request;

    const projectImageService = container.resolve(CreateProjectImageService);

    const image = await projectImageService.execute({ filename, proj_id });

    return response.json(image);
  }
}

export default ProjectImagesController;
