import Student from '../models/StudentM';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async store(req, res) {
    try {
      const newStudent = await Student.create(req.body);
      return res.json(newStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }

  async show(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      return res.send(student);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      const studentUpdated = await student.update(req.body);

      return res.json(studentUpdated);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      await student.destroy(student);

      return res.json(true);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }
}

export default new StudentController();
