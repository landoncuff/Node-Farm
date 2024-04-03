// Getting Access to our database through mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
app.listen(port, () => {
  // console.log('App Running on port ' + port);
});
