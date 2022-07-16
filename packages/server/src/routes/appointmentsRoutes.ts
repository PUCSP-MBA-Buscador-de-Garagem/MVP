import { Router } from "express";

import UserController from '../controllers/UserController';
import ProviderController from '../controllers/ProviderController';
import AppointmentsController from "../controllers/AppointmentsController";
import ensureAuthenticatation from '../middlewares/ensureAuthentication';

const appointmentRoutes = Router();
const appointmentController = new AppointmentsController();

appointmentRoutes.use(ensureAuthenticatation);
appointmentRoutes.post('/', appointmentController.create);
appointmentRoutes.patch('/', appointmentController.update);
appointmentRoutes.delete('/:id', appointmentController.remove);

export default appointmentRoutes;
