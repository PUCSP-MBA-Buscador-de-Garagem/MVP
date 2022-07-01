import { randomUUID } from 'node:crypto';

import { inject, injectable } from "tsyringe";

import { TSize } from "../@types/types";
import Vehicle from "../entities/Vehicle";
import IVehicleRepository from '../repositories/interfaces/IVehicleRepository';

interface IRequest {
  brand: string;
  model: string;
  year: string;
  size: TSize;
}

@injectable()
class CreateVehicleService {
  constructor(
    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
  ) {}

  public async execute(vehicleData: IRequest) {
    const vehicle = new Vehicle({
      id: randomUUID(),
      ...vehicleData
    })

    await this.vehicleRepository.create(vehicle);

    return vehicle;
  }
}

export default CreateVehicleService;

