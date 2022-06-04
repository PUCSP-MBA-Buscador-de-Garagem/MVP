import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';

import User from "../entities/User";


import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUserRepository from "./interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  private filePath: string;

  constructor() {
    this.filePath = 'src/database/users.json'
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User(
      {
        id: randomUUID(),
        ...userData
      }
    );

    await this.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const usersCollection = await this.read();
    return usersCollection.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    const usersCollection = await this.read();
    return usersCollection.find(user => user.id === id);
  }

  private async read(): Promise<User[]> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data) as User[];
  }

  private async write(usersCollection: User[]): Promise<void> {
    return await fs.writeFile(this.filePath, JSON.stringify(usersCollection));
  }

  public async save(user: User): Promise<void> {
    const usersCollection = await this.read();
    usersCollection.push(user);
    await this.write(usersCollection);
  }

  public async update(user: User): Promise<User> {
    const usersCollection = await this.read();
    const userToBeUpdated = usersCollection.findIndex(storedUser => storedUser.id === user.id)

    usersCollection[userToBeUpdated] = user;

    await this.write(usersCollection);
    return user;
  }
}

export default UserRepository;

