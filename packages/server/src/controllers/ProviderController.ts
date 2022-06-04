import { NextFunction, Request, Response } from "express";
import { container } from 'tsyringe';

// import CreateUserService from "../services/CreateUserService";
import CreateProviderService from "../services/CreateProviderService";

class ProviderController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { width, length, place } = request.body;
      if (!width || !length || !place) {
        throw new Error("Invalid data to create a new user!");
      }

      // const user_id = request.user.id;
      const user_id = '433f5a04-f7c0-48f2-af65-87b05b6ebd4f';

      const createProvider = container.resolve(CreateProviderService);
      const provider = createProvider.execute({ user_id, width, length, place })

      return response.status(201).json(provider);

    } catch (error) {
      next(error);
    }
  }
}

export default ProviderController;
