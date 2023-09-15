"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserC = require('../controllers/UserC'); var _UserC2 = _interopRequireDefault(_UserC);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// router.get('/', userController.index);
// router.get('/:id', userController.show);

router.post('/', _loginRequired2.default, _UserC2.default.store);
router.put('/', _loginRequired2.default, _UserC2.default.update);
router.delete('/', _loginRequired2.default, _UserC2.default.delete);

exports. default = router;
