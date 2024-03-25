const express = require('express');
const tourController = require('./../controllers/tourController');
// Destructuring -- const {createTour, etc} = require('./../controllers/tourController');
const router = express.Router();

// Param Middleware
router.param('id', tourController.checkID);

// Combining app.get('/api/v1/tours', getAllTours); app.post('/api/v1/tours', createTour);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
