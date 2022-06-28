import { TSize } from "../@types/types";
import ICreateVehicleDTO from "../dtos/ICreateVehicleDTO";

class Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  size: TSize

  constructor({ id, brand, model, year, size }: ICreateVehicleDTO) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.size = size;
  }
}

export default Vehicle;

