import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import './container';
import userRoutes from './routes/userRoutes';
import errorHandling from './middlewares/errorHandling';
import sessionRoutes from './routes/sessionRoutes';


class App {
  public express;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  routes() {
    this.express.use('/user', userRoutes);
    this.express.use('/session', sessionRoutes);
    this.express.use(errorHandling)
  }
}

export default new App().express;


