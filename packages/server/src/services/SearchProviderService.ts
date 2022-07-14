import { inject, injectable } from "tsyringe";
import { TAddress } from "../@types/types";
import Provider from "../entities/Provider";
import IProviderRepository from "../repositories/interfaces/IProviderRepository";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import IVehicleRepository from "../repositories/interfaces/IVehicleRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  user_id: string;
  address: TAddress;
  start: string;
  end: string;
}

@injectable()
class SearchProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
  ) {}

  public async execute({ user_id, address, start, end }: IRequest): Promise<Provider[]> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError('User does not exists!');

    if (!user.vehicle_id) throw new AppError('User doesn\'t have a vehicle');
    const vehicle = await this.vehicleRepository.findById(user.vehicle_id);
    if (!vehicle) throw new AppError('Vehicle not found!');

    const providerList = await this.providerRepository.findAvailable({
      vehicleSize: vehicle.size
    });

    return providerList;
  }
}

export default SearchProviderService;

