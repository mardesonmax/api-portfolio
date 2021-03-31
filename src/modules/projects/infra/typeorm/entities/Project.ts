import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Project;
