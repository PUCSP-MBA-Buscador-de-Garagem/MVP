import { TProviderAddress, TProviderAvailability, TSize } from "../@types/types";
import IProviderDTO from "../dtos/IProviderDTO";

class Provider {
  address: TProviderAddress;
  availability: TProviderAvailability;
  id: string;
  size: TSize;
  user_id: string;

  constructor({ id, user_id, size, availability, address  }: IProviderDTO) {
    this.availability = availability;
    this.id = id;
    this.size = size;
    this.user_id = user_id;
    this.address = address;
  }

}

export default Provider;
