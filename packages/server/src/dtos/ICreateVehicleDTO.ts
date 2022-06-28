import { TSize } from "../@types/types";

interface ICreateVehicleDTO {
  id: string,
  brand: string,
  model: string,
  year: string,
  size: TSize
}

export default ICreateVehicleDTO;
