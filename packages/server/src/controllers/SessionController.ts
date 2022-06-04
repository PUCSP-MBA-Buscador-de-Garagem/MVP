import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../services/AuthenticateUserService';

interface ILoggedUser {
  id: string
  name: string
  email: string
}

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });


    const loggedUser: ILoggedUser = user;

    return response.json({ loggedUser, token });
  }
}

export default SessionsController;
