import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import IVehicleRepository from "../repositories/interfaces/IVehicleRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  user_id: string;
  vehicle_id: string;
}

@ injectable()
class UpdateVehicleService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
  ) {}

  public async execute({ user_id, vehicle_id }: IRequest) {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('User not found!');
    if (user.vehicle_id == vehicle_id) throw new AppError('User already has this vehicle. No effect on User.');

    const vehicle = await this.vehicleRepository.findById(vehicle_id);
    if (!vehicle) throw new AppError('Vehicle does not exists on database');

    user.vehicle_id = vehicle_id;

    this.userRepository.updateUser(user);
  }
}

export default UpdateVehicleService;

