import { inject, injectable } from 'tsyringe';

import IHashProvider from "../providers/interfaces/IHashProvider";
import IProviderRepository from '../repositories/interfaces/IProviderRepository';
import IUserRepository from "../repositories/interfaces/IUserRepository";
import AppError from '../utils/errors/AppError';

interface IRequest {
  user_id: string;
  width: number;
  length: number;
  place: {
    zipcode: string;
    number: number;
  }
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
    ) {}

  public async execute({ user_id, width, length, place }: IRequest) {

    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError("User does not exists");

    const provider = await this.providerRepository.create({
      width,
      length,
      place
    });

    user.provider_id = provider.id;

    await this.userRepository.update(user);
    return provider;
  }
}

export default CreateProviderService;

