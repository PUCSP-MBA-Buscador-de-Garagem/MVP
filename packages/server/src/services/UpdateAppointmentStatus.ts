import { inject, injectable } from "tsyringe";
import IAppointmentRepository from "../repositories/interfaces/IAppointmentRepository";
import { TAppointmentStatus } from '../@types/types';
import AppError from "../utils/errors/AppError";

interface IRequest {
  user_id: string;
  appointment_id: string;
  status: TAppointmentStatus;
}

@injectable()
class UpdateAppointmentStatus {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ user_id, appointment_id, status }: IRequest) {
    const appointment = await this.appointmentRepository.findById(appointment_id);
    if (!appointment) throw new AppError('Appointment doesn\'t exists.');
    if (appointment.user_id !== user_id) throw new AppError('Invalid User');
    if (appointment.status == status) throw new AppError(`Appointment alread has status ${status}. No effect on Appointment.`);

    if (appointment.status === 'cancelled') throw new AppError('Appointment cancelled. Invalid Operation');

    appointment.status = status
    await this.appointmentRepository.updateAppointment(appointment);
  }
}

export default UpdateAppointmentStatus;

