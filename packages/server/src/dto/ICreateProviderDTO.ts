export interface ILocation {
  cep: string;
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

export interface ICreateProviderDTO {
  size: ISize;
  availability: IAvailabilityEntry[];
  location: ILocation;
  images: string[]
}

