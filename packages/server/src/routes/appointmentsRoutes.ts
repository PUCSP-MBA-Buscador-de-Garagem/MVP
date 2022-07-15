import { Router } from "express";

import UserController from '../controllers/UserController';
import ProviderController from '../controllers/ProviderController';
import ensureAuthenticatation from '../middlewares/ensureAuthentication';

const appointmentRoutes = Router();
const userController = new UserController();
const providerController = new ProviderController();

appointmentRoutes.use(ensureAuthenticatation);
appointmentRoutes.post('/register', providerController.create);

export default appointmentRoutes;
