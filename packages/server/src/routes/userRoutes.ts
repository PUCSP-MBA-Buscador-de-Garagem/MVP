import { Router } from "express";

import UserController from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/register', userController.create);

export default userRoutes;
