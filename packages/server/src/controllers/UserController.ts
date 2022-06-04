import { NextFunction, Request, Response } from "express";
import { container } from 'tsyringe';

import CreateUserService from "../services/CreateUserService";

class UserController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { name, email, password } = request.body;
      if (!name || !email || !password) {
        throw new Error("Invalid data to create a new user!");
      }

      const createUser = container.resolve(CreateUserService);
      const user = createUser.execute({ name, email, password })

      return response.status(201).json(user);

    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
