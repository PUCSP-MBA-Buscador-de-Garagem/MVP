import { randomUUID } from 'node:crypto';
import User from "../../entities/User";

import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import IUserRepository from "../interfaces/IUserRepository";

class FakeUserRepository implements IUserRepository {
  private data: User[];

  constructor() {
    this.data = [];
  }
  save(user: User): Promise<void> {
    throw new Error('Not used on fake repository');
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User({
        id: randomUUID(),
        ...userData
      });

    await this.data.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.data.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.data.find(user => user.id === id);
  }

  public async update(user: User): Promise<User> {
    const userToBeUpdated = await this.data.findIndex(storedUser => storedUser.id === user.id)

    this.data[userToBeUpdated] = user;

    return await user;
  }
}

export default FakeUserRepository;

