interface ICreateProviderDTO {
  width: number;
  length: number;
  place: {
    zipcode: string;
    number: number;
  };
}

export default ICreateProviderDTO;
