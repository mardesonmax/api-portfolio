import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import uploadConfig from '@config/upload';
import Project from './Project';

@Entity('project_images')
class ProjectImage {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid')
  proj_id: string;

  @Column()
  filename: string;

  @Column({ nullable: true })
  url?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'proj_id' })
  project: Project;

  @Expose({ name: 'url' })
  getUrl(): string | null {
    if (!this.filename) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.API_BASE_URL}/files/${this.filename}`;
      case 's3':
        return `https://${uploadConfig.aws.bucket}.s3.amazonaws.com/${this.filename}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default ProjectImage;
