import { randomUUID } from 'node:crypto';
import User from "../../entities/User";

import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import IUserRepository from "../interfaces/IUserRepository";
import FakeRepository from './FakeRepository';

class FakeUserRepository extends FakeRepository<User> implements IUserRepository {
  constructor() {
    super();
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User({
        id: randomUUID(),
        ...userData
      });

    this._insert(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const result = await this._findBy('email', email)[0];
    return result;
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this._findBy('id', id)[0];
  }

  public async update(user: User): Promise<User> {
    return await this._update(user)
  }
}

export default FakeUserRepository;


