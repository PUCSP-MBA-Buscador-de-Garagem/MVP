import { NextFunction, Request, Response } from "express";
import { container } from 'tsyringe';

// import CreateUserService from "../services/CreateUserService";
import CreateProviderService from "../services/CreateProviderService";

class ProviderController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { user_id, address, size, availability } = request.body;
      if (!user_id) {
        throw new Error("Invalid data to create a new user!");
      }

      const createProvider = container.resolve(CreateProviderService);
      const provider = createProvider.execute({ user_id, address, size, availability })

      return response.status(201).json(provider);

    } catch (error) {
      next(error);
    }
  }
}

export default ProviderController;
