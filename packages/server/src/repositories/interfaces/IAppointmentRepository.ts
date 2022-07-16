import Appointment from "../../entities/Appointment";
import IAppointmentUpdateDTO from "../dtos/IAppointmentUpdateDTO";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";

interface IAppointmentRepository {
  create(appointmentData: ICreateAppointmentDTO): Promise<Appointment>;
  findById(id: string): Promise<Appointment | undefined>;
  updateAppointment(appointment: IAppointmentUpdateDTO): Promise<Appointment>;
}

export default IAppointmentRepository;
