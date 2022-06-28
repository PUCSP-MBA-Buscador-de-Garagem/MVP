import { IProviderAddress, IProviderAvailability, IProviderSize } from "../@types/types";

interface IProviderDTO {
  address: IProviderAddress;
  availability: IProviderAvailability;
  id: string;
  size: IProviderSize;
  user_id: string;
}


export default IProviderDTO;
