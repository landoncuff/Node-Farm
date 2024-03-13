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

// Using Promises to read Promises
/*
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
*/

// Using Async/Await
const getDocPic = async () => {
  try {
    // Will wait for the resolve from the Promise
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise("dog-image-promise.txt", res.body.message);
    console.log("dog image added");
  } catch (err) {
    console.log(err);
    // Will add an error to the return value
    throw err;
  }

  return "2: READY";
};

// Using an IFFY instead
(async () => {
  try {
    const data = await getDocPic();

    console.log('1: getting dog pics');
    console.log(data);
    console.log('3: done getting dog pics');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
})();

/*
console.log('1: getting dog pics');
getDocPic().then(x => {
  console.log(x);
  console.log('3: done getting dog pics');
}).catch(err => {
  console.log(`Error: ${err}`);
});
*/

/*
  returns a Promise
  const x = getDocPic();
  console.log(x);
*/
