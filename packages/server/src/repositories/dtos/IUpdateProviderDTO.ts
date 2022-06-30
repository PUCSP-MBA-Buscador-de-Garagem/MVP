import { TProviderAddress, TProviderAvailability, TSize } from "../../@types/types";

interface IUpdateProviderDTO {
  id: string;
  address?: TProviderAddress;
  availability?: TProviderAvailability;
  size?: TSize;
}

export default IUpdateProviderDTO;

