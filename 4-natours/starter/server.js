// Getting Access to our database through mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION');
  console.log(err.name, err.message);
  // Shutting down the app
  process.exit(1);
});

// Getting our environment variables
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // Returns a Promise
    console.log('DB Connection successful');
  });

const app = require('./app');

const port = process.env.PORT || 3000;
// Will start up a server
const server = app.listen(port, () => {
  // console.log('App Running on port ' + port);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log(err.message);
  console.log('UNHANDLED REJECTION');
  // Closing server before shutting down app
  server.close(() => {
    // Shutting down the app
    process.exit(1);
  });
});