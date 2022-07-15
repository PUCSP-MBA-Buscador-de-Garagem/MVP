import { isAfter, isBefore } from "date-fns";
import { inject, injectable } from "tsyringe";
import { TAddress } from "../@types/types";
import IAppointmentRepository from "../repositories/interfaces/IAppointmentRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
  provider_id: string;
  start?: string;
  end?: string;
}

@injectable()
class UpdateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ id, user_id, provider_id, start, end}: IRequest) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) throw new AppError('Appointment does not exists!');
    if (appointment?.user_id !== user_id) throw new AppError('User not logged in', 401);

    await this.appointmentRepository.updateAppointment({ id, user_id, provider_id, start, end });
  }
}

export default UpdateAppointmentService;

