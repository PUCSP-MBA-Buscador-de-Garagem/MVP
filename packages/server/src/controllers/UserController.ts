import { NextFunction, Request, Response } from "express";
import { container } from 'tsyringe';

import AppError from "../utils/errors/AppError";
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserService";

class UserController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { name, email, password } = request.body;
      if (!name || !email || !password) {
        throw new AppError("Invalid data to create a new user!");
      }

      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({ name, email, password })

      return response.status(201).json(user);

    } catch (error) {
      next(error);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { user, name, email } = request.body;
      if (!user) {
        throw new AppError('User must be logged!', 401);
      }

      const updateUser = container.resolve(UpdateUserService);
      const userUpdated = await updateUser.execute({ user_id: user.id, name, email });

      return response.status(201).json(userUpdated);

    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
