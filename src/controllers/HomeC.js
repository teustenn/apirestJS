import Student from '../models/StudentM';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      name: 'Peter',
      lastname: 'Parker',
      email: 'peter@parker.com',
      age: 17,
      weight: 69.7,
      height: 1.75,
    });

    res.json(newStudent);
  }
}

export default new HomeController();
