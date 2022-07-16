import { TAddress, TProviderAvailability, TSize } from "../../@types/types";

interface IUpdateProviderDTO {
  id: string;
  address?: TAddress;
  availability?: boolean;
  size?: TSize;
}

export default IUpdateProviderDTO;

