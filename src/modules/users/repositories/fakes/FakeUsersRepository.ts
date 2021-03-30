import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, userData);
    this.users.push(user);
    return user;
  }

  async save(userData: User): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === userData.id);
    this.users[userIndex] = userData;
    return userData;
  }
}

export default FakeUsersRepository;
