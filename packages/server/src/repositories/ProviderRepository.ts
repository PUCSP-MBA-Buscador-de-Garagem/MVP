import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';

import Provider from '../entities/Provider';
import IProviderRepository from './interfaces/IProviderRepository';
import ICreateProviderDTO from '../dtos/ICreateProviderDTO';

class ProviderRepository implements IProviderRepository {
  private filePath: string;

  constructor() {
    this.filePath = 'src/database/provider.json'
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    const provider = new Provider(
      {
        id: randomUUID(),
        ...providerData
      }
    );

    await this.save(provider);

    return provider;
  }

  // async findByEmail(email: string): Promise<User | undefined> {
  // const usersCollection = await this.read();
  //   return usersCollection.find(user => user.email === email);
  // }

  // async findById(id: string): Promise<User | undefined> {
  //   const usersCollection = await this.read();
  //   return usersCollection.find(user => user.id === id);
  // }

  private async read(): Promise<Provider[]> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data) as Provider[];
  }

  private async write(usersCollection: Provider[]): Promise<void> {
    return await fs.writeFile(this.filePath, JSON.stringify(usersCollection));
  }

  public async save(provider: Provider): Promise<void> {
    const providersCollection = await this.read();
    providersCollection.push(provider);
    await this.write(providersCollection);
  }
}

export default ProviderRepository;

