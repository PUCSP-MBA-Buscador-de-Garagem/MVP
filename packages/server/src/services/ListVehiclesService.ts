import { inject, injectable } from "tsyringe";
import Vehicle from "../entities/Vehicle";
import IVehicleRepository from "../repositories/interfaces/IVehicleRepository";

@injectable()
class ListVehiclesService {
  constructor(
    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
  ) {}

  public async execute(): Promise<Vehicle[] | undefined> {
    return await this.vehicleRepository.find({});
  }
}

export default ListVehiclesService;

