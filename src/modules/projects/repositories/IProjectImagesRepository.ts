import ICreateProjectImageDTO from '../dtos/iCreateProjectImageDTO';
import ProjectImage from '../infra/typeorm/entities/ProjectImage';

export default interface IProjectImagesRepository {
  create(data: ICreateProjectImageDTO): Promise<ProjectImage>;
  save(projectImage: ProjectImage): Promise<ProjectImage>;
  findById(id: string): Promise<ProjectImage | undefined>;
}
