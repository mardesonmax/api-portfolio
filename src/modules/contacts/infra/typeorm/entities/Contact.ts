import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('contacts')
class Contact {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  user_id: string;

  @Column()
  facebook?: string;

  @Column()
  twitter?: string;

  @Column()
  instagram?: string;

  @Column()
  email?: string;

  @Column()
  whatsapp?: string;

  @Column()
  github?: string;

  @Column()
  linkedin?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User)
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Contact;
