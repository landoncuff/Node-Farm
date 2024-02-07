// Need to read a large text file and then send it to the client.

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (reg, res) => {
  // Solution 1
    fs.readFile("test-file.txt", (err, data) => {
      if (err) console.log(err);

      res.end(data);
    });

  // Solution 2: streams
    const readable = fs.createReadStream("test=file.txt"); // will consume piece by piece
    // Each piece will provide readable "data"
    readable.on("data", (chunk) => {
      // Writing each piece to client
      res.write(chunk);
    });

    // When the strea is finished reading
    readable.on("end", () => {
      res.end(); // ready to end the request
    });

    readable.on('error', err => {
      console.log(err);
      res.statusCode = 500;
      res.end('File not found');
    });

  // Solution 3
  // Uisng the pipe()
  const readable2 = fs.createReadStream("test=file.txt"); // will consume piece by piece
  readable2.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
