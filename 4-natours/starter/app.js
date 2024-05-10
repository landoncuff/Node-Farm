const express = require('express');
const morgan = require('morgan');

// Getting Route Handlers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
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
  // Will move straight to the error middleware
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

// Error Middleware
app.use(globalErrorHandler);

//! START SERVER
module.exports = app;
