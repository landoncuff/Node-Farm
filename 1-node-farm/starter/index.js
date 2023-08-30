// Connecting a module  
const fs = require('fs'); // fs = file system
const http = require('http'); // http module 



////////////////////////////////
// FILES

// Reading a file (blocking)
const textIn = fs.readFileSync('starter/txt/input.txt', 'utf-8');
// console.log(textIn);

// Writing to a file
const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
fs.writeFileSync('starter/txt/output.txt', textOut);

// console.log('File was written');

// Reading file asynchronous (non-blocking)
fs.readFile('starter/txt/start.txt', 'utf-8', (err, data1) => {
    // The value coming from data1 is the name of the file 
    fs.readFile(`starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        fs.readFile(`starter/txt/append.txt`, 'utf-8', (err, data3) => {
            // Writing all the data to a File
            fs.writeFile('starter/txt/final.txt', `${data2}\n${data3}` , 'utf-8', err => {
                console.log('File has been written');
            });
        });
    });
});


////////////////////////////////////////////////////////////////////////
// SERVER 

const server = http.createServer((req, res) => {
    res.end("This is a response back from the server");
});

server.listen(8000, '127.0.0.1', () => {

});