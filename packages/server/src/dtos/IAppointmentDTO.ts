import { TAppointmentStatus } from "../@types/types";

interface IAppointmentDTO {
  id: string;
  user_id: string;
  provider_id: string;
  start: string;
  end: string;
  status: TAppointmentStatus;
}

export default IAppointmentDTO;

