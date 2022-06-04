import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes';

import './container';

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
  }
}

export default new App().express;


