import Vehicle from "../../entities/Vehicle";
import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';
import IFindVehicleDTO from '../dtos/IFindVehicleDTO';

interface IVehicleRepository {
  create(vehicleData: ICreateVehicleDTO): Promise<Vehicle>;
  find(query: IFindVehicleDTO): Promise<Vehicle[] | undefined>;
  findById(id: string): Promise<Vehicle | undefined>;
  updateVehicle(vehicle: Vehicle): Promise<Vehicle>;
}

export default IVehicleRepository;
