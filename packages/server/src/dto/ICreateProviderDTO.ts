interface ILocation {
  cep: number;
  city: string;
  state: string;
  number: string;
  region: string;
}

interface IAvailabilityEntry {
  startAt: Date;
  endAt: Date;
}

interface ISize {
  width: number;
  height: number;
  length: number;
}

interface ICreateProviderDTO {
  size: ISize;
  availability: IAvailabilityEntry[];
  location: ILocation;
  images: string[]
}

export default ICreateProviderDTO;

