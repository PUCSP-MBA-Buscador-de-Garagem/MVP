import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;
}

@injectable()
class UpdateUserService {
  constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id, name, email }: IRequest) {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError('User does not exists!');

    if (user.name !== name && name) user.name = name;
    if (user.email !== email && email) user.email = email;

    return await this.userRepository.updateUser(user);
  }
}

export default UpdateUserService;

