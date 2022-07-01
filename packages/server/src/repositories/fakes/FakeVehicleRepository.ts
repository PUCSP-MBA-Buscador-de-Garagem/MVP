import { randomUUID } from 'node:crypto';

import FakeRepository from './FakeRepository';
import Vehicle from '../../entities/Vehicle';
import IVehicleRepository from '../interfaces/IVehicleRepository';
import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';

class FakeVehicleRepository extends FakeRepository<Vehicle> implements IVehicleRepository {
  constructor() {
    super();
  }

  public async create(vehicleData: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = new Vehicle({
        id: randomUUID(),
        ...vehicleData
      });

    this.insert(vehicle);

    return vehicle;
  }

  public async findById(id: string): Promise<Vehicle | undefined> {
    return await this.findBy('id', id)[0];
  }

  public async updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return await this.update(vehicle);
  }
}

export default FakeVehicleRepository;
