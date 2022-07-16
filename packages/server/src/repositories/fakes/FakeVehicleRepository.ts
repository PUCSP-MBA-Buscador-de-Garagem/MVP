import { randomUUID } from 'node:crypto';

import FakeRepository from './FakeRepository';
import Vehicle from '../../entities/Vehicle';
import IVehicleRepository from '../interfaces/IVehicleRepository';
import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';
import IFindVehicleDTO from '../dtos/IFindVehicleDTO';

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

  public async find(query: IFindVehicleDTO): Promise<Vehicle[] | undefined> {
    const vehicleCollection = await this.read();

    const searchData = {
      counter: 0,
      entries: Object.entries(query)
    }

    const searchResult = vehicleCollection.filter(vehicle => {
      for (const [key, value] of searchData.entries) {
        const vehicleProp = key as keyof Vehicle;

        if (vehicle[vehicleProp] == value) {
          searchData.counter++;
        }
      }

      if (searchData.counter === searchData.entries.length) {
        searchData.counter = 0;
        return vehicle;
      }

      searchData.counter = 0;
    })

    if (!searchResult || searchResult.length < 1) return undefined;

    return searchResult;
  }

  public async findById(id: string): Promise<Vehicle | undefined> {
    return await this.findBy('id', id)[0];
  }

  public async updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return await this.update(vehicle);
  }
}

export default FakeVehicleRepository;
