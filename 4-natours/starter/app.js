const express = require('express');
const morgan = require('morgan');

// Getting Route Handlers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Will add a bunch of methods into the app variable
const app = express();

//! Middlewares
// 3rd Party morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// We have to middle wear to make this work
app.use(express.json());

// Allowing access to static files -- middleware
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//! Mounting Our Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//! Middleware that will handle routes that do not exist
// .all will handle all the urls that are not handled
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err); // Will move straight to the error middleware
});

// Error Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

  next();
});

//! START SERVER
module.exports = app;
