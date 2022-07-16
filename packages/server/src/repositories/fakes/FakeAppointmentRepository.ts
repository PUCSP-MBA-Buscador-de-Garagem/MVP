import { randomUUID } from "node:crypto";
import Appointment from "../../entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IAppointmentRepository from "../interfaces/IAppointmentRepository";
import FakeRepository from "./FakeRepository";

class FakeAppointmentRepository extends FakeRepository<Appointment> implements IAppointmentRepository {
  constructor() {
    super();
  }
  deleteAppointment(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve(this.delete(id));
    });
  }

  public async create(appointmentData: ICreateAppointmentDTO): Promise<Appointment> {
    const user = new Appointment({
        id: randomUUID(),
        ...appointmentData
      });

    this.insert(user);

    return user;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    return await this.findBy('id', id)[0];
  }

  public async updateAppointment(appointment: Appointment): Promise<Appointment> {
    return await this.update(appointment);
  }
}

export default FakeAppointmentRepository;
