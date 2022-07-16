import { TSize } from "../../@types/types";

interface IUpdateVehicleDTO {
  id: string;
  brand: string;
  model: string;
  year: string;
  size: TSize;
}

export default IUpdateVehicleDTO;


