import Appointment from "../../entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";

interface IAppointmentRepository {
  create(appointmentData: ICreateAppointmentDTO): Promise<Appointment>;
  findById(id: string): Promise<Appointment | undefined>;
  updateAppointment(appointment: Appointment): Promise<Appointment>;
}

export default IAppointmentRepository;
