import Vehicle from "../../entities/Vehicle";
import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';
import IFindVehicleDTO from '../dtos/IFindVehicleDTO';

interface IVehicleRepository {
  create(appointmentData: ICreateVehicleDTO): Promise<Vehicle>;
  find(query: IFindVehicleDTO): Promise<Vehicle[] | undefined>;
  findById(id: string): Promise<Vehicle | undefined>;
  updateVehicle(appointment: Vehicle): Promise<Vehicle>;
}

export default IVehicleRepository;
