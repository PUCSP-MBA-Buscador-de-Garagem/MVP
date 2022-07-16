import { TSize } from "../../@types/types";

interface IFindVehicleDTO {
  brand?: string;
  model?: string;
  year?: string;
  size?: TSize;
}

export default IFindVehicleDTO;
