import { randomUUID } from "node:crypto";

import Appointment from "../../../entities/Appointment";
import Repository from "./Repository";
import IAppointmentRepository from "../../interfaces/IAppointmentRepository";
import ICreateAppointmentDTO from "../../dtos/ICreateAppointmentDTO";
import IAppointmentUpdateDTO from "../../dtos/IAppointmentUpdateDTO";

class AppointmentRepository extends Repository<Appointment> implements IAppointmentRepository {
  constructor() {
    super('src/database/appointments.json')
  }
  public async create(appointmentData: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment({
      id: randomUUID(),
      ...appointmentData
    });

  await this.insert(appointment);

  return appointment;
  }

  public async delete(id: string): Promise<void> {
    const appointmentCollection = await this.read();
    const deleteIndex = appointmentCollection.findIndex(appointment => appointment.id === id);
    appointmentCollection.splice(deleteIndex, 1);

    this.save(appointmentCollection);
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const appointmentCollection = await this.read();
    return appointmentCollection.find(appointment => appointment.id === id);
  }

  public async updateAppointment({ id, user_id, provider_id, start, end }: IAppointmentUpdateDTO): Promise<Appointment> {
    const appointmentCollection = await this.read();
    const appointmentToBeUpdated = appointmentCollection.findIndex(storedAppointment => storedAppointment.id === id)

    const updatedAppointment = new Appointment({
      id,
      user_id: user_id ? user_id : appointmentCollection[appointmentToBeUpdated].user_id,
      provider_id: provider_id ? provider_id : appointmentCollection[appointmentToBeUpdated].provider_id,
      start: start ? start : appointmentCollection[appointmentToBeUpdated].start,
      end: end ? end : appointmentCollection[appointmentToBeUpdated].end,
      status: appointmentCollection[appointmentToBeUpdated].status
    })

    appointmentCollection[appointmentToBeUpdated] = updatedAppointment;
    await this.save(appointmentCollection);

    return updatedAppointment;
  }
}

export default AppointmentRepository;

