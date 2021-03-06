import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../services/AuthenticateUserService';
import AppError from '../utils/errors/AppError';

interface ILoggedUser {
  id: string
  name: string
  email: string
}

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response | undefined> {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new AppError('Login invalid!');
    }

    const authenticateUser = container.resolve(AuthenticateUserService);

    try {
      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
      delete user.password;

      return response.json({ user, token });
    } catch (error) {
      console.error(error);

      const errorResponse = error as AppError;

      response.json({ error: errorResponse.message });
    }

  }
}

export default SessionsController;
