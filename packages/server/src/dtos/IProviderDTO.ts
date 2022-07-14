import { TAddress, TSize } from "../@types/types";

interface IProviderDTO {
  address: TAddress;
  availability: boolean;
  id: string;
  size: TSize;
}

export default IProviderDTO;
