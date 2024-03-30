const dotenv = require('dotenv');
// Getting our environment variables
dotenv.config({ path: './config.env' });

const app = require('./app');

// const port = process.env.PORT || 3000;
const port = 27017;
// Will start up a server
app.listen(port, () => {
  // console.log('App Running on port ' + port);
});
