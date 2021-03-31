import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProjectService from '@modules/projects/services/CreateProjectService';

class ProjectsController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      body: { title, description, link_code, link_project, base_url, status },
    } = request;

    const projectService = container.resolve(CreateProjectService);

    const project = await projectService.execute({
      title,
      description,
      link_code,
      link_project,
      base_url,
      status,
    });

    return response.json(project);
  }
}

export default ProjectsController;
