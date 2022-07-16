import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';

import Repository from './Repository';
import User from '../../../entities/User';
import IUserRepository from '../../interfaces/IUserRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUserUpdateDTO from '../../dtos/IUserUpdateDTO';

class UserRepository extends Repository<User> implements IUserRepository {
  constructor() {
    super('src/database/users.json');
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User({
        id: randomUUID(),
        ...userData
      });

    await this.insert(user);

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

  public async updateUser({ id, name, vehicle_id }: IUserUpdateDTO): Promise<User> {
    const usersCollection = await this.read();
    const userToBeUpdated = usersCollection.findIndex(storedUser => storedUser.id === id)

    const updatedUser = new User({
      id: id,
      name: name ? name : usersCollection[userToBeUpdated].name,
      email: usersCollection[userToBeUpdated].email,
      password: usersCollection[userToBeUpdated].password,
      vehicle_id: vehicle_id ? vehicle_id : usersCollection[userToBeUpdated].vehicle_id,
      provider_id: usersCollection[userToBeUpdated].provider_id
    })

    usersCollection[userToBeUpdated] = updatedUser;
    await this.save(usersCollection);

    return updatedUser;
  }
}

export default UserRepository;

