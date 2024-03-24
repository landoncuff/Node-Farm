const app = require('./app');

const port = 3000;
// Will start up a server
app.listen(port, () => {
  console.log('App Running on port ' + port);
});