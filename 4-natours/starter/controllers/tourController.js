const Tour = require('./../models/tourModel'); // Getting our model

//! ROUTES

exports.getAllTours = (req, res) => {
  // Sending back all the tours
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // requestTime: req.requestTime,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; // will convert string into number
  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: tour,
    // },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
