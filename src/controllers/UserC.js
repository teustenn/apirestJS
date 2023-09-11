import User from '../models/UserM';

class UserController {
  async create(req, res) {
    const newUser = await User.create({
      name: 'Peter',
      email: 'peter@parker.com',
      password: '12345678',
    });

    res.json(newUser);
  }
}

export default new UserController();
