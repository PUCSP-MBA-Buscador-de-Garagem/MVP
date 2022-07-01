import { randomUUID } from 'node:crypto';

import Repository from './Repository';
import Vehicle from '../../../entities/Vehicle';
import IVehicleRepository from '../../interfaces/IVehicleRepository';
import ICreateVehicleDTO from '../../dtos/ICreateVehicleDTO';
import IUpdateVehicleDTO from '../../dtos/IUpdateVehicleDTO';
import IFindVehicleDTO from '../../dtos/IFindVehicleDTO';

class VehicleRepository extends Repository<Vehicle> implements IVehicleRepository {
  constructor() {
    super('src/database/vehicles.json');
  }

  public async create(vehicleData: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = new Vehicle({
        id: randomUUID(),
        ...vehicleData
      });

    await this.insert(vehicle);

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

  async findById(id: string): Promise<Vehicle | undefined> {
    const vehicleCollection = await this.read();
    return vehicleCollection.find(vehicle => vehicle.id === id);
  }

  public async updateVehicle({ id, brand, model, year, size }: IUpdateVehicleDTO): Promise<Vehicle> {
    const vehicleCollection = await this.read();
    const vehicleToBeUpdated = vehicleCollection.findIndex(storedVehicle => storedVehicle.id === id)

    const updatedVehicle = new Vehicle({
      id,
      brand: brand ? brand : vehicleCollection[vehicleToBeUpdated].brand,
      model: model ? model : vehicleCollection[vehicleToBeUpdated].model,
      year: year ? year : vehicleCollection[vehicleToBeUpdated].year,
      size: size ? size : vehicleCollection[vehicleToBeUpdated].size,
    })

    vehicleCollection[vehicleToBeUpdated] = updatedVehicle;
    await this.save(vehicleCollection);

    return updatedVehicle;
  }
}

export default VehicleRepository;

