const express = require('express');
const tourController = require('./../controllers/tourController');
// Destructuring -- const {createTour, etc} = require('./../controllers/tourController');
const router = express.Router();

// Making an Alias
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// Aggregation
router.route('/tour-stats').get(tourController.getTourStats);

// Combining app.get('/api/v1/tours', getAllTours); app.post('/api/v1/tours', createTour);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
