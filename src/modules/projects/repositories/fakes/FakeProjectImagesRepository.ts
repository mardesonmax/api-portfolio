import ICreateProjectImageDTO from '@modules/projects/dtos/iCreateProjectImageDTO';
import ProjectImage from '@modules/projects/infra/typeorm/entities/ProjectImage';
import IProjectImagesRepository from '../IProjectImagesRepository';

class FakeProjectImagesRepository implements IProjectImagesRepository {
  private projectImages: ProjectImage[] = [];

  async create(date: ICreateProjectImageDTO): Promise<ProjectImage> {
    const projectImage = new ProjectImage();

    Object.assign(projectImage, date);

    this.projectImages.push(projectImage);

    return projectImage;
  }

  async findById(id: string): Promise<ProjectImage | undefined> {
    return this.projectImages.find((findImage) => findImage.id === id);
  }

  async save(projectImage: ProjectImage): Promise<ProjectImage> {
    const imageIndex = this.projectImages.findIndex(
      (image) => image.id === projectImage.id
    );

    this.projectImages[imageIndex] = projectImage;

    return projectImage;
  }
}

export default FakeProjectImagesRepository;
