import { inject, injectable } from "tsyringe";
import IAppointmentRepository from "../repositories/interfaces/IAppointmentRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ id, user_id }: IRequest) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) throw new AppError('Appointment does not exists.');
    if (appointment.user_id !== user_id) throw new AppError('User must be logged in!');

    await this.appointmentRepository.delete(id);
  }
}

export default DeleteAppointmentService;

