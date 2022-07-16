import { TAddress, TProviderAvailability, TSize } from "../@types/types";
import IProviderDTO from "../dtos/IProviderDTO";

class Provider {
  address: TAddress;
  availability: boolean;
  id: string;
  size: TSize;

  constructor({ id, size, availability, address  }: IProviderDTO) {
    this.address = address;
    this.availability = availability;
    this.id = id;
    this.size = size;
  }
}

export default Provider;
