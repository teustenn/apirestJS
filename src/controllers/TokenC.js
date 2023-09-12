import User from '../models/UserM';

class TokenController {
  async create(req, res) {
    res.send('ok');
  }
}

export default new TokenController();
