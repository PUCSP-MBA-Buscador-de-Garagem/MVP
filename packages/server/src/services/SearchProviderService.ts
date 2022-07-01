import { inject, injectable } from "tsyringe";
import { TAddress } from "../@types/types";
import IProviderRepository from "../repositories/interfaces/IProviderRepository";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  user_id: string;
  location: TAddress;
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
  ) {}

  public async execute({ user_id, location, start, end }: IRequest) {
    const user = await this.providerRepository.findById(user_id);
    if (!user) throw new AppError('User does not exists!');

    
  }
}

export default SearchProviderService;

