import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import homeR from './src/routes/homeR';

class App {
  constructor() {
    this.app = express();
    this.middrewares();
    this.routes();
  }

  middrewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeR);
  }
}

export default new App().app;
