import { ICreateProviderDTO } from '../dto/ICreateProviderDTO';
import Provider from '../entities/Provider';

interface IProvidersRepository {
  register(data: ICreateProviderDTO): Promise<Provider>;
}

export default IProvidersRepository;
