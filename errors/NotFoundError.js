class NotFoundError extends Error {
  constructor() {
    super();
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
