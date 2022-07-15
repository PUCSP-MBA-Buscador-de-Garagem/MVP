import { inject, injectable } from 'tsyringe';

import AppError from '../utils/errors/AppError';
import IUserRepository from "../repositories/interfaces/IUserRepository";
import IVehicleRepository from '../repositories/interfaces/IVehicleRepository';
import Vehicle from '../entities/Vehicle';

interface IRequest {
  user_id: string;
  vehicle_id: string;
}

@injectable()
class AssignVehicleToUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
    ) {}

  public async execute({ user_id, vehicle_id }: IRequest) {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError('User not found!');

    const vehicle = await this.vehicleRepository.findById(vehicle_id);

    if (!vehicle) throw new AppError('Vehicle not found!');

    user.vehicle_id = vehicle_id;
    const updatedUser = await this.userRepository.updateUser(user);

    return updatedUser;
  }
}

export default AssignVehicleToUser;

