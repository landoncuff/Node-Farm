const express = require('express');

// Will add a bunch of methods into the app variable
const app = express();

// Routing to get HTTP method
app.get('/', (req, res) => {
  res
    .status(400)
    .json({ message: 'Hello from the server side', app: 'Natour' });
});

app.post('/', (req, res) => {
    res.send("You can post to this endpoint");
});

const port = 3000;
// Will start up a server
app.listen(port, () => {
  console.log('App Running on port ' + port);
});

// Rest API
