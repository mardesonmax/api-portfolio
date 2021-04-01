import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateProjectDTO {
  title: string;
  description: string;
  link_code?: string;
  link_project?: string;
  base_url?: string;
  status?: boolean;
  users: User[];
}
