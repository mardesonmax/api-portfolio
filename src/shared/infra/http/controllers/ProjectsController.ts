import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import ListProjectService from '@modules/projects/services/ListProjectService';

class ProjectsController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProjects = container.resolve(ListProjectService);

    const projects = await listProjects.execute();

    return response.json(projects);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      body: { title, description, link_code, link_project, status },
      user,
    } = request;

    const projectService = container.resolve(CreateProjectService);

    const project = await projectService.execute({
      title,
      description,
      link_code,
      link_project,
      status,
      user_id: user.id,
    });

    return response.json(project);
  }
}

export default ProjectsController;
