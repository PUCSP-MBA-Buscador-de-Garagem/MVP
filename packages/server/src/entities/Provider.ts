export interface ILocation {
  cep: number;
  city: string;
  state: string;
  number: string;
  region: string;
}

export interface IAvailabilityEntry {
  startAt: Date;
  endAt: Date;
}

export interface ISize {
  width: number;
  height: number;
  length: number;
}

export interface IProviderDTO {
  id: string;
  size: ISize;
  availability: IAvailabilityEntry[];
  location: ILocation;
  images: string[]
}

class Provider {
  id: string;
  size: ISize;
  availability: IAvailabilityEntry[];
  location: ILocation;
  images: string[];

  constructor({ id, size, availability, location, images }: IProviderDTO) {
    this.id = id;
    this.size = size;
    this.availability = availability;
    this.location = location;
    this.images = images;
  }
}

export default Provider;
