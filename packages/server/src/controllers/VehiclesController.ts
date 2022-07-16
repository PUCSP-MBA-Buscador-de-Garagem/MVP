import { NextFunction, Request, Response } from "express";
import { container } from 'tsyringe';
import AssignVehicleToUser from "../services/AssignVehicleToUser";

import CreateVehicleService from "../services/CreateVehicleService";
import ListVehiclesService from "../services/ListVehiclesService";
import AppError from "../utils/errors/AppError";

class VehiclesController {
  public async list(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const listVehicles = container.resolve(ListVehiclesService);
      const resultVehicleList = await listVehicles.execute();

      return response.status(200).json(resultVehicleList);
    } catch (error) {
      next(error);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { user, vehicle_id } = request.body;
      if (!user) throw new AppError('User must be logged in!');

      const assignVehicle = container.resolve(AssignVehicleToUser);
      const updatedUserWithVehicleData = await assignVehicle.execute({ user_id: user.id, vehicle_id });

      return response.status(201).json(updatedUserWithVehicleData);
    } catch (error) {
      next(error);
    }
  }
}

export default VehiclesController;
