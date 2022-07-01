import { TSize } from "../../@types/types";

interface ICreateVehicleDTO {
  brand: string;
  model: string;
  year: string;
  size: TSize;
}

export default ICreateVehicleDTO;

