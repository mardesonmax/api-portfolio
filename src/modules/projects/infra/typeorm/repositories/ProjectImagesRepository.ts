import ICreateProjectImageDTO from '@modules/projects/dtos/iCreateProjectImageDTO';
import ProjectImage from '@modules/projects/infra/typeorm/entities/ProjectImage';
import IProjectImagesRepository from '@modules/projects/repositories/IProjectImagesRepository';
import { getRepository, Repository } from 'typeorm';

class ProjectImagesRepository implements IProjectImagesRepository {
  private ormRepository: Repository<ProjectImage>;

  constructor() {
    this.ormRepository = getRepository(ProjectImage);
  }

  async create({
    filename,
    proj_id,
    url,
  }: ICreateProjectImageDTO): Promise<ProjectImage> {
    const projectImage = this.ormRepository.create({
      filename,
      proj_id,
      url,
    });

    await this.ormRepository.save(projectImage);

    return projectImage;
  }

  async findById(id: string): Promise<ProjectImage | undefined> {
    return this.ormRepository.findOne({ id });
  }

  async save(projectImage: ProjectImage): Promise<ProjectImage> {
    await this.ormRepository.save(projectImage);
    return projectImage;
  }
}

export default ProjectImagesRepository;
