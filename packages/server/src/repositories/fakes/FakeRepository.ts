import { randomUUID } from 'node:crypto';
import User from "../../entities/User";

import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import IUserRepository from "../interfaces/IUserRepository";

class FakeRepository<T extends { id: string }> {
  private collection: T[];

  constructor() {
    this.collection = [];
  }

  public delete(id: string) {
    const itemIndex = this.collection.findIndex((item: T) => item.id === id);
    this.collection.splice(itemIndex, 1);
  }

  public findBy(prop: keyof T, value: any): (T | undefined)[] {
    const searchResult = this.collection.map((item: T) => {
      if (item[prop] == value) return item;
    });

    return searchResult;
  }

  public insert(data: T) {
    this.collection.push(data);
  }

  public update(data: T) {
    const itemIndex = this.collection.findIndex((item: T) => item.id === data.id);
    this.collection[itemIndex] = data;
    return data;
  }
}

export default FakeRepository;

