import { TAddress, TAppointmentStatus } from "../../@types/types";

interface IAppointmentUpdateDTO {
  id: string;
  user_id: string;
  provider_id?: string;
  start?: string;
  end?: string;
}

export default IAppointmentUpdateDTO;
