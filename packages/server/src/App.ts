import express, { NextFunction, Request, Response, urlencoded } from 'express';
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
    this.express.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.express.use('/user', userRoutes);
    this.express.use('/session', sessionRoutes);
    this.express.use(errorHandling);
  }
}

export default new App().express;


