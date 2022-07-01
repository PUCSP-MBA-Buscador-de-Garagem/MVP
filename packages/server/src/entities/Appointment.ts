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
    this.user_id = user_id;
    this.provider_id = provider_id;
    this.start = start;
    this.end = end;
    this.status = status;
  }
}

export default Appointment;

