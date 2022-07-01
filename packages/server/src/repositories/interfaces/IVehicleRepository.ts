import Vehicle from "../../entities/Vehicle";
import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';

interface IVehicleRepository {
  create(appointmentData: ICreateVehicleDTO): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle | undefined>;
  updateVehicle(appointment: Vehicle): Promise<Vehicle>;
}

export default IVehicleRepository;
