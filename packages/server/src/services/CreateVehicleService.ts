import { randomUUID } from 'node:crypto';

import { inject, injectable } from "tsyringe";

import { TSize } from "../@types/types";
import Vehicle from "../entities/Vehicle";
import IVehicleRepository from '../repositories/interfaces/IVehicleRepository';
import AppError from '../utils/errors/AppError';

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
    const vehicleExists = await this.vehicleRepository.find({ brand: vehicleData.brand, model: vehicleData.model, year: vehicleData.year });
    if (vehicleExists) throw new AppError('Vehicle already on database');

    const vehicle = new Vehicle({
      id: randomUUID(),
      ...vehicleData
    })


    await this.vehicleRepository.create(vehicle);

    return vehicle;
  }
}

export default CreateVehicleService;

