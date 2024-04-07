// Getting Access to our database through mongoose
const mongoose = require('mongoose');

// Creating a mongoose schema and model
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, // Remove all white space
    required: [true, 'Tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Tour must have a cover image'],
  },
  images: [String], // an array of strings
  createdAt: {
    type: Date,
    default: Date.now(), // Todays date
    select: false,
  },
  startDates: [Date], // Array of dates
});

const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;
