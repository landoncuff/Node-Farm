const dotenv = require('dotenv');
// Getting our environment variables
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;
// Will start up a server
app.listen(port, () => {
  // console.log('App Running on port ' + port);
});
