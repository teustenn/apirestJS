"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');

_dotenv2.default.config();

require('./database');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _homeR = require('./routes/homeR'); var _homeR2 = _interopRequireDefault(_homeR);
var _photoR = require('./routes/photoR'); var _photoR2 = _interopRequireDefault(_photoR);
var _studentR = require('./routes/studentR'); var _studentR2 = _interopRequireDefault(_studentR);
var _userR = require('./routes/userR'); var _userR2 = _interopRequireDefault(_userR);
var _tokenR = require('./routes/tokenR'); var _tokenR2 = _interopRequireDefault(_tokenR);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middrewares();
    this.routes();
  }

  middrewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use('/images/', _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', _homeR2.default);
    this.app.use('/photos', _photoR2.default);
    this.app.use('/students', _studentR2.default);
    this.app.use('/users', _userR2.default);
    this.app.use('/tokens', _tokenR2.default);
  }
}

exports. default = new App().app;
