import { inject, injectable } from 'tsyringe';

import IHashProvider from "../providers/interfaces/IHashProvider";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import AppError from '../utils/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {}

  public async execute({ name, email, password }: IRequest) {
    const checkIfUserExists = await this.userRepository.findByEmail(email);
    if (checkIfUserExists) throw new AppError('Email address already registered in database');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;

