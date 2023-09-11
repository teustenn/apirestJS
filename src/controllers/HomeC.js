class HomeController {
  index(req, res) {
    res.json({
      id: 12345,
    });
  }
}

export default new HomeController();
