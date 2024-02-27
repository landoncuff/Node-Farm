const fs = require("fs");
const http = require("http");
const superagent = require("superagent");

// Callback Hell
// fs.readFile(`${__dirname}/dog.txt`, "utf8", (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       fs.writeFile("dog-image.txt", res.body.message, (err) => {
//         console.log("Random Dog image saved to the file");
//       });
//     });
// });

////////////////////////////////////////////////////////////////////////
// Promises
// fs.readFile(`${__dirname}/dog.txt`, "utf8", (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     // This is a new Promise
//     .then((res) => {
//       fs.writeFile("dog-image.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random Dog image saved to the file");
//       });
//     })
//     .catch((err) => {
//       return console.log(err.message);
//     });
// });

// Building our own Promise
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) return reject("I could not find that file"); // available in catch method
      resolve(data); // Will be returned back to us (available in then method)
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("I could not write file"); // available in catch method
      resolve("Random Dog image saved to the file"); // Will be returned back to us (available in then)
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    // returns a promise so we can chain
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((data) => {
    console.log(data.body.message);
    return writeFilePromise("dog-image-promise.txt", data.body.message);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
