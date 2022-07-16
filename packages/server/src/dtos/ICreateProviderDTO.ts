import { TAddress, TProviderAvailability, TSize } from "../@types/types";

interface ICreateProviderDTO {
  address: TAddress;
  availability: boolean;
  size: TSize;
  user_id: string;
}

export default ICreateProviderDTO;
