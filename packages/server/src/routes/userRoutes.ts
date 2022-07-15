import { Router } from "express";

import UserController from '../controllers/UserController';
import ProviderController from '../controllers/ProviderController';
import ensureAuthenticatation from '../middlewares/ensureAuthentication';

const userRoutes = Router();
const providerController = new ProviderController();
const userController = new UserController();

userRoutes.post('/register', userController.create);

userRoutes.use(ensureAuthenticatation);
userRoutes.patch('/profile', userController.update)
userRoutes.post('/provider', providerController.create);

export default userRoutes;
