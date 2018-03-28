class WordService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  getWord() {
    return this.res.status(200).json({
      status: "success",
      data: "programmer"
    });
  }
}
module.exports = WordService;
