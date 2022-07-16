import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';

import Provider from '../../../entities/Provider';
import IProviderRepository from '../../interfaces/IProviderRepository';
import ICreateProviderDTO from '../../../dtos/ICreateProviderDTO';
import Repository from './Repository';
import IUpdateProviderDTO from '../../dtos/IUpdateProviderDTO';
import IFindAvailables from '../../dtos/IFindAvailables';

import { sizeCheck } from '../../../utils/app/dataComparrison';

class ProviderRepository extends Repository<Provider> implements IProviderRepository {
  constructor() {
    super('src/database/providers.json');
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    const provider = new Provider(
      {
        id: randomUUID(),
        ...providerData
      }
    );

    await this.insert(provider);

    return provider;
  }

  async findAvailable({ vehicleSize }: IFindAvailables): Promise<Provider[]> {
    const providersCollection = await this.read();

    const result = providersCollection.filter((provider: Provider) => {
      if (sizeCheck(provider.size, vehicleSize) && provider.availability) {
        return provider;
      }
    });

    return result;
  }

  async findById(id: string): Promise<Provider | undefined> {
    const providersCollection = await this.read();
    return providersCollection.find(provider => provider.id === id);
  }

  async updateProvider({ id, address, size, availability }: IUpdateProviderDTO): Promise<Provider> {
    const providersCollection = await this.read();
    const providerToBeUpdated = providersCollection.findIndex(storedProvider => storedProvider.id === id)

    const updatedProvider = new Provider({
      id,
      address: address ? address : providersCollection[providerToBeUpdated].address,
      availability: availability ? availability : providersCollection[providerToBeUpdated].availability,
      size: size ? size : providersCollection[providerToBeUpdated].size
    })

    providersCollection[providerToBeUpdated] = updatedProvider;
    await this.save(providersCollection);

    return updatedProvider;
  }
}

export default ProviderRepository;

