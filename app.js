import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import homeR from './src/routes/homeR';
import photoR from './src/routes/photoR';
import studentR from './src/routes/studentR';
import userR from './src/routes/userR';
import tokenR from './src/routes/tokenR';

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
    this.app.use('/photos', photoR);
    this.app.use('/students', studentR);
    this.app.use('/users', userR);
    this.app.use('/tokens', tokenR);
  }
}

export default new App().app;
