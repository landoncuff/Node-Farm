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

// Creating a mongoose schema and model
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
});

const Tour = new mongoose.model('Tour', tourSchema);

// Creating a new document
const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497,
});

// Saving that new document (returns Promise)
testTour
  .save()
  .then((document) => {
    console.log(document);
  })
  .catch((err) => {
    console.log(err);
  });

const app = require('./app');

const port = process.env.PORT || 3000;
// Will start up a server
app.listen(port, () => {
  // console.log('App Running on port ' + port);
});
