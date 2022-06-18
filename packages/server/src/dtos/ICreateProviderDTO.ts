import { IProviderAddress, IProviderAvailability, IProviderSize } from "../entities/Provider";

interface ICreateProviderDTO {
  address: IProviderAddress;
  availability: IProviderAvailability;
  size: IProviderSize;
  user_id: string;
}

export default ICreateProviderDTO;
