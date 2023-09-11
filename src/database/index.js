import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Student from '../models/StudentM';
import User from '../models/UserM';

const models = [Student, User];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
