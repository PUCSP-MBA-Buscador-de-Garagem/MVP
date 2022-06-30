import Provider from "../../entities/Provider";
import ICreateProviderDTO from "../../dtos/ICreateProviderDTO";
import IUpdateProviderDTO from "../dtos/IUpdateProviderDTO";

interface IProviderRepository {
  create(data: ICreateProviderDTO): Promise<Provider>;
  findById(id: string): Promise<Provider | undefined>;
  updateProvider(data: IUpdateProviderDTO): Promise<Provider>;
}

export default IProviderRepository;
