import { Router } from 'express';

import providersController from '../controllers/providersController';

const providersRouter = Router();

providersRouter.post('/', providersController.createProvider);

export default providersRouter;

