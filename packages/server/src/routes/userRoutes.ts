import { Router } from "express";

import UserController from '../controllers/UserController';
import ProviderController from '../controllers/ProviderController';
import ensureAuthenticatation from '../middlewares/ensureAuthentication';
import AppointmentsController from "../controllers/AppointmentsController";

const userRoutes = Router();
const appointmentsController = new AppointmentsController();

userRoutes.post('/register', appointmentsController.create);

userRoutes.use(ensureAuthenticatation);
userRoutes.post('/provider', appointmentsController.create);

export default userRoutes;
