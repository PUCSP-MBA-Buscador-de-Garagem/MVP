import { Router } from "express";

import UserController from '../controllers/UserController';
import ProviderController from '../controllers/ProviderController';
import ensureAuthenticatation from '../middlewares/ensureAuthentication';
import VehiclesController from "../controllers/VehiclesController";

const userRoutes = Router();
const providerController = new ProviderController();
const userController = new UserController();
const vehiclesController = new VehiclesController();

userRoutes.post('/register', userController.create);

userRoutes.use(ensureAuthenticatation);
userRoutes.patch('/profile', userController.update)
userRoutes.post('/provider', providerController.create);
userRoutes.patch('/vehicle', vehiclesController.update)
userRoutes.get('/search', providerController.list);

export default userRoutes;
