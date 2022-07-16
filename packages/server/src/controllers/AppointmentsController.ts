import { isValid, isAfter, isBefore } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { container } from 'tsyringe';

import CreateAppointmentService from "../services/CreateAppointmentService";
import UpdateAppointmentService from "../services/UpdateAppointmentService";
import UpdateAppointmentStatus from "../services/UpdateAppointmentStatus";

import AppError from "../utils/errors/AppError";

class AppointmentsController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const { user, provider_id, start, end } = request.body;
      if (!user) throw new AppError('User must be logged!', 401);

      if (!provider_id || !start || !end) {
        throw new Error("Invalid data to create a new appointment!");
      }

      const appointmentDateStart = new Date(start);
      const appointmentDateEnd = new Date(end);

      if (!isValid(appointmentDateStart)) {
        throw new AppError(`Appointment start date/time invalid.\nReceived ${start}`);
      }

      if (isBefore(appointmentDateStart, new Date(Date.now()))) {
        throw new AppError('Appointment invalid. The start of the appointment must be placed in a future moment.');
      }

      if (!isValid(appointmentDateEnd)) {
        throw new AppError(`Appointment start date/time invalid.\n Received ${end}`);
      }

      if (isBefore(appointmentDateEnd, appointmentDateStart)) {
        throw new AppError('Appointment invalid. The date/time end of an appointment must be after the start.');
      }

      const createAppointment = container.resolve(CreateAppointmentService);
      const appointment = await createAppointment.execute({
        user_id: user.id,
        provider_id,
        start,
        end
      })

      return response.status(200).json(appointment);

    } catch (error) {
      throw new AppError(`Invalid date to create an appointment. ${error}`);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { user, id, start, end, provider_id, status } = request.body;
      if (!user) throw new AppError('User must be logged in.', 401);

      const updateAppointment = container.resolve(UpdateAppointmentService);
      let AppointmentUpdated = await updateAppointment.execute({ id, user_id: user.id, provider_id, start, end });

      if (status) {
        const updateAppointmentStatus = container.resolve(UpdateAppointmentStatus);
        AppointmentUpdated = await updateAppointmentStatus.execute({ user_id: user.id, appointment_id: id, status });
      }

      return response.status(201).json(AppointmentUpdated);

    } catch (error) {
      next(error);
    }
  }
}

export default AppointmentsController;
