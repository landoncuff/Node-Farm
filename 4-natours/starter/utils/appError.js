class AppError extends Error {
  // Inherit all the Error methods

  constructor(message, statusCode) {
    // Calling the parent class (Error) and passing the message into it
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    // Capturing Stack Trace (shows where the error happened)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
