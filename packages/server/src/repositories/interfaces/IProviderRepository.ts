import Provider from "../../entities/Provider";
import IProviderUserDTO from "../../dtos/ICreateProviderDTO";

interface IProviderRepository {
  create(data: IProviderUserDTO): Promise<Provider>;
  findById(id: string): Promise<Provider | undefined>
}

export default IProviderRepository;
