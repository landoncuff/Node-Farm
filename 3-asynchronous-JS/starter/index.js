const fs = require("fs");
const http = require("http");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, "utf8", (err, data) => {
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      fs.writeFile("dog-image.txt", res.body.message, (err) => {
        console.log("Random Dog image saved to the file");
      });
    });
});


