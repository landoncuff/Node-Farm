const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

// Changing thread pool size
process.env.UV_THREAD_POOL_SIZE = 3;


// Writting a setTimeout function
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log('Immediate 1 finished'));


// Reding a file
fs.readFile('test.js', () => {
    console.log('I/O finished');
    console.log('-----------------------------------------');
    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log('Immediate 2 finished'));

    process.nextTick(() => console.log('Process.nextTick')); // Will process before all the callbacks in this function

    // Encrypting a password
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password Encrypted');
    });

    // Using the sync function instead
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password Encrypted 2');
});

// Only code that is a top-level code
console.log('Hello from the top-level code');
