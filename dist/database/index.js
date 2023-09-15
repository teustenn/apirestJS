"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _StudentM = require('../models/StudentM'); var _StudentM2 = _interopRequireDefault(_StudentM);
var _UserM = require('../models/UserM'); var _UserM2 = _interopRequireDefault(_UserM);
var _PhotoM = require('../models/PhotoM'); var _PhotoM2 = _interopRequireDefault(_PhotoM);

const models = [_StudentM2.default, _UserM2.default, _PhotoM2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
