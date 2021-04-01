import { Exclude } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import ProjectImage from './ProjectImage';

@Entity('projects')
class Project {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  link_code?: string;

  @Column({ nullable: true })
  link_project?: string;

  @Column({ nullable: true })
  base_url?: string;

  @OneToOne(() => ProjectImage, (image) => image.project)
  image: ProjectImage;

  @BeforeInsert()
  @BeforeUpdate()
  baseUrl(): void {
    const url = this.title.trim().toLowerCase().split(' ').join('_');
    this.base_url = url;
  }

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: 'users_projects',
    joinColumn: { name: 'proj_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  @Exclude()
  users: User[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Project;
