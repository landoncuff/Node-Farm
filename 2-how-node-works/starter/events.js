// Requiring built in Node Events
const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    // getting acess to all the methods in the paraent class
    super();
  }
}

// Old way
// const myEmitter = new EventEmitter();
const myEmitter = new Sales();

// Setting up listeners
// This is the observer method
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Landon");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are new ${stock} items left in stock.`);
});

// Emit is like clicking on a button
// We are also passing in params to the listener
myEmitter.emit("newSale", 9);

////////////////////////////////////////////////////////////////

// Create small web sever and listen to the emits
const server = http.createServer();

// Listen to different events the server emits
server.on("request", (req, res) => {
  console.log("Request received");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another Request received");
});

server.on("close", () => {
  console.log("Server Closed");
});

// Start server
server.listen(8000, "127.0.0.1", () => {
  console.log("Waitng for requests....");
});
