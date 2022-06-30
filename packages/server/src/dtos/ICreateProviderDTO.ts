import { TProviderAddress, TProviderAvailability, TSize } from "../@types/types";

interface ICreateProviderDTO {
  address: TProviderAddress;
  availability: TProviderAvailability;
  size: TSize;
  user_id: string;
}

export default ICreateProviderDTO;
