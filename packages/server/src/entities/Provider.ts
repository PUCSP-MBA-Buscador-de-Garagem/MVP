interface IProviderDTO {
  address: IProviderAddress;
  availability: IProviderAvailability;
  id: string;
  size: IProviderSize;
  user_id: string;
}

export type IProviderAddress = {
  city: string;
  FU: string;
  number: number;
  zipcode: string;
}

export type IProviderAvailability = {
  start: string;
  end: string;
}

export type IProviderSize = {
  height: number;
  length: number;
  width: number;
}

class Provider {
  address: IProviderAddress;
  availability: IProviderAvailability;
  id: string;
  size: IProviderSize;
  user_id: string;

  constructor({ id, user_id, size, availability  }: IProviderDTO) {
    this.availability = availability;
    this.id = id;
    this.size = size;
    this.user_id = user_id;
  }

}

export default Provider;
