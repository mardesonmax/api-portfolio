import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Exclude } from 'class-transformer';
import Project from '@modules/projects/infra/typeorm/entities/Project';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
