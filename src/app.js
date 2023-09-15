import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';

import express from 'express';
import homeR from './routes/homeR';
import photoR from './routes/photoR';
import studentR from './routes/studentR';
import userR from './routes/userR';
import tokenR from './routes/tokenR';

class App {
  constructor() {
    this.app = express();
    this.middrewares();
    this.routes();
  }

  middrewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
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
