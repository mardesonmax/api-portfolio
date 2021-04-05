import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import ListProjectService from '@modules/projects/services/ListProjectService';
import ShowProjectService from '@modules/projects/services/ShowProjectService';
import UpdateProjectService from '@modules/projects/services/UpdateProjectService';
import DeleteProjectService from '@modules/projects/services/DeleteProjectService';

class ProjectsController {
  async show(request: Request, response: Response): Promise<Response> {
    const { base_url } = request.params;

    const listProjects = container.resolve(ShowProjectService);

    const projects = await listProjects.execute(base_url);

    return response.json(projects);
  }

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

  async update(request: Request, response: Response): Promise<Response> {
    const {
      params: { proj_id },
      body: { title, description, link_code, link_project, status },
      user,
    } = request;

    const projectService = container.resolve(UpdateProjectService);

    const project = await projectService.execute({
      id: proj_id,
      title,
      description,
      link_code,
      link_project,
      status,
      user_id: user.id,
    });

    return response.json(project);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const {
      params: { proj_id },
      user,
    } = request;

    const deleteProject = container.resolve(DeleteProjectService);

    await deleteProject.execute({
      proj_id,
      user_id: user.id,
    });

    return response.status(204).send();
  }
}

export default ProjectsController;
