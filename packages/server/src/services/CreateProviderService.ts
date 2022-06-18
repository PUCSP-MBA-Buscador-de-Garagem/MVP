import { randomUUID } from 'node:crypto';

import { inject, injectable } from 'tsyringe';

import IHashProvider from "../providers/interfaces/IHashProvider";
import IProviderRepository from '../repositories/interfaces/IProviderRepository';
import IUserRepository from "../repositories/interfaces/IUserRepository";
import AppError from '../utils/errors/AppError';

import { IProviderAddress, IProviderAvailability, IProviderSize } from '../entities/Provider'

interface IRequest {
  address: IProviderAddress;
  availability: IProviderAvailability;
  size: IProviderSize;
  user_id: string;
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
    ) {}

  public async execute({ user_id, address, size, availability }: IRequest) {

    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError("User does not exists");

    const provider = await this.providerRepository.create({
      user_id,
      address,
      size,
      availability
    });

    user.provider_id = provider.id;

    await this.userRepository.update(user);
    return provider;
  }
}

export default CreateProviderService;

