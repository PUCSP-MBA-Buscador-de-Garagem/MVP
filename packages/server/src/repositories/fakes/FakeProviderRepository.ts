import { randomUUID } from 'node:crypto';
import ICreateProviderDTO from '../../dtos/ICreateProviderDTO';
import Provider from '../../entities/Provider';

import IProviderRepository from '../interfaces/IProviderRepository';
import FakeRepository from './FakeRepository';
import { sizeCheck } from '../../utils/app/dataComparrison'
import IFindAvailables from '../dtos/IFindAvailables';

class FakeProviderRepository extends FakeRepository<Provider> implements IProviderRepository {
  constructor() {
    super();
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    const provider = new Provider({
        id: randomUUID(),
        ...providerData
      });

    await this.insert(provider);

    return provider;
  }

  public async delete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findAvailable({ vehicleSize }: IFindAvailables): Promise<Provider[]> {
    const providersCollection = this.read()

    const result = providersCollection.filter((provider: Provider) => {
      if (sizeCheck(provider.size, vehicleSize) && provider.availability) {
        return provider;
      }
    });

    return result;
  }


  async findById(id: string): Promise<Provider | undefined> {

    return await this.findBy('id', id)[0];
  }

  public async updateProvider(provider: Provider): Promise<Provider> {
    return await this.update(provider);
  }
}

export default FakeProviderRepository;
