import Provider from "../../entities/Provider";
import IProviderUserDTO from "../../dtos/ICreateProviderDTO";

interface IProviderRepository {
  create(data: IProviderUserDTO): Promise<Provider>;
}

export default IProviderRepository;
