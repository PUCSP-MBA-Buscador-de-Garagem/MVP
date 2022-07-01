import { TAppointmentStatus } from "../../@types/types";

interface ICreateAppointmentDTO {
  user_id: string;
  provider_id: string;
  start: string;
  end: string;
  status: TAppointmentStatus;
}

export default ICreateAppointmentDTO;

