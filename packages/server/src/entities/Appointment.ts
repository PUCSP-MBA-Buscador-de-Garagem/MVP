import { TAppointmentStatus } from "../@types/types";
import IAppointmentDTO from "../dtos/IAppointmentDTO";

class Appointment {
  id: string;
  user_id: string;
  provider_id: string;
  start: string;
  end: string;
  status: TAppointmentStatus;

  constructor({ id, user_id, provider_id, start, end, status }: IAppointmentDTO) {
    this.id = id;
    this.end = end;
    this.provider_id = provider_id;
    this.start = start;
    this.status = status;
    this.user_id = user_id;
  }
}

export default Appointment;

