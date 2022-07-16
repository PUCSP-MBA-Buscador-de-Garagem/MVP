import { Router } from "express";

import UserController from '../controllers/UserController';
import ProviderController from '../controllers/ProviderController';
import ensureAuthenticatation from '../middlewares/ensureAuthentication';
import VehiclesController from "../controllers/VehiclesController";

const vehicleRoutes = Router();
const vehicleController = new VehiclesController();

vehicleRoutes.use(ensureAuthenticatation);
vehicleRoutes.get('/', vehicleController.list);

export default vehicleRoutes;
