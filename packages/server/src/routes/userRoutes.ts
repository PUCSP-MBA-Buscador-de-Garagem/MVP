import { Router } from "express";

import UserController from '../controllers/UserController';
import ProviderController from '../controllers/ProviderController';
import ensureAuthenticatation from '../middlewares/ensureAuthentication';

const userRoutes = Router();
const userController = new UserController();
const providerController = new ProviderController();

userRoutes.post('/register', userController.create);

userRoutes.use(ensureAuthenticatation);
userRoutes.post('/provider', providerController.create);

export default userRoutes;
