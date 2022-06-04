interface IProviderPlaceDTO {
  zipcode: string;
  number: number;
}

interface IProviderDTO {
  id: string
  width: number;
  length: number;
  place: IProviderPlaceDTO;
}

class Provider {
  id: string
  width: number;
  length: number;
  place: IProviderPlaceDTO;

  constructor({ id, width, length, place }: IProviderDTO) {
    this.id = id;
    this.width = width;
    this.length = length;
    this.place = place;
  }

}

export default Provider;
