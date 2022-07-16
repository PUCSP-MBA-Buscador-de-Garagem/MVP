import { inject, injectable } from "tsyringe";
import IAppointmentRepository from "../repositories/interfaces/IAppointmentRepository";

import IProviderRepository from "../repositories/interfaces/IProviderRepository";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  user_id: string;
  provider_id: string;
  start: string;
  end: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ user_id, provider_id, start, end }: IRequest) {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError("User does not exists");

    const provider = await this.providerRepository.findById(provider_id);
    if (!provider) throw new AppError("Provider does not exists");

    const appointment = await this.appointmentRepository.create({
      user_id,
      provider_id,
      start,
      end,
      status: 'pending'
    })

    return appointment;
  }
}

export default CreateAppointmentService;

