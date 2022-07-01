import { TSize } from "../@types/types";
import IVehicleDTO from "../dtos/IVehicleDTO";

class Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  size: TSize;

  constructor({ id, brand, model, year, size }: IVehicleDTO) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.size = size;
  }
}

export default Vehicle;

