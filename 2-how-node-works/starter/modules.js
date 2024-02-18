// console.log(arguments);
// console.log(require('module').wrapper);

// Getting the Calculator variable (module.exports)
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(3, 5));

// Exports
const calc2 = require("./test-module-2");
console.log(calc2.add(3, 5));

// Exports but using destructering
const { add, multiply, divide } = require("./test-module-2");
console.log(add(3, 5));

// Cashing
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();