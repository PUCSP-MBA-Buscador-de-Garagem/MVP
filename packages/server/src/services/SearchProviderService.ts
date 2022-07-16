import { inject, injectable } from "tsyringe";
import { TAddress } from "../@types/types";
import Provider from "../entities/Provider";
import IDistanceAPI from "../providers/interfaces/IDistanceAPI";
import IProviderRepository from "../repositories/interfaces/IProviderRepository";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import IVehicleRepository from "../repositories/interfaces/IVehicleRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  user_id: string;
  address: TAddress;
  range: number;
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

    @inject('DisyanceAPIProvider')
    private distanceAPIProvider: IDistanceAPI,
  ) {}

  public async execute({ user_id, address, range }: IRequest): Promise<Provider[] | undefined> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError('User does not exists!');

    if (!user.vehicle_id) throw new AppError('User doesn\'t have a vehicle');
    const vehicle = await this.vehicleRepository.findById(user.vehicle_id);
    if (!vehicle) throw new AppError('Vehicle not found!');

    const providerList = await this.providerRepository.findAvailable({
      vehicleSize: vehicle.size
    });

    const result = providerList.filter(async (provider) => {
      if (provider.id !== user_id && await this.distanceAPIProvider.getDistance(address, provider.address) <= range) {
        return provider;
      }
    });

    if (result.length <= 0) return undefined;

    return result;
  }
}

export default SearchProviderService;

