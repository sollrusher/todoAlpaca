function ServerError(message, code) {
    this.message = message || 'Ошибка!';
    this.status = code || 400;
    this.stack = (new Error()).stack;
  }

module.exports = ServerError;