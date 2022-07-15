import { NextFunction, Request, Response } from "express";
import { container } from 'tsyringe';

import CreateVehicleService from "../services/CreateVehicleService";
import ListVehiclesService from "../services/ListVehiclesService";

class VehiclesController {
  public async list(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const listVehicles = container.resolve(ListVehiclesService);
      const resultVehicleList = await listVehicles.execute();

      return response.status(200).json(resultVehicleList);
    }
  }
}

export default VehiclesController;
