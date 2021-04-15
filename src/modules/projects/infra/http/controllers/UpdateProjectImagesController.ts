import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateProjectImageService from '@modules/projects/services/UpdateProjectImageService';

class UpdateProjectImagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      params: { proj_id },
      file: { filename },
    } = request;

    const updateProjectImageService = container.resolve(
      UpdateProjectImageService
    );

    const image = await updateProjectImageService.execute({
      filename,
      proj_id,
    });

    return response.json(image);
  }
}

export default UpdateProjectImagesController;
