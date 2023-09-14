import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Student from '../models/StudentM';
import User from '../models/UserM';
import Photo from '../models/PhotoM';

const models = [Student, User, Photo];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
