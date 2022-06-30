import { TProviderAddress, TProviderAvailability, TSize } from "../@types/types";

interface IProviderDTO {
  address: TProviderAddress;
  availability: TProviderAvailability;
  id: string;
  size: TSize;
  user_id: string;
}

export default IProviderDTO;
