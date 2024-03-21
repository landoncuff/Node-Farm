const fs = require('fs');
const express = require('express');

// Will add a bunch of methods into the app variable
const app = express();

// We have to middle wear to make this work
app.use(express.json());

// Reading the data (only reading the data once instead of each time) - Putting into an object
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Building our API -- In POSTMAN we will send in URL "127.0.0.1:3000/api/v1/tours"
app.get('/api/v1/tours', (req, res) => {
  // Sending back all the tours
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

// GET request with a variable (parameter)
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // will convert string into number
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  // Object.assign will combine two objects into one
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  // Writing the new tour to the file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// Updating the data
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
});

// Updating the data
app.put('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
});

// Delete data 
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;
// Will start up a server
app.listen(port, () => {
  console.log('App Running on port ' + port);
});
