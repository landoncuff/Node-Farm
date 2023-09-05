// Connecting a module  
const fs = require('fs'); // fs = file system
const http = require('http'); // http module 
const url = require('url'); // url module 



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
// SERVER & Routing

const server = http.createServer((req, res) => {

    const pathName = req.url; // Getting the path (always starts with '/')

    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the overview');
    }else if(pathName === '/product'){
        res.end('This is the product');
    }else{
        // Add a HTTP status code
        res.writeHead(404, { 
            'Content-type': 'text/html', // Server is now looking for HTML,
            'my-own-header': 'hello-world'
        });
        res.end('<h1>This page not found</h1>'); // Turning response into HTML because that is what the server is looking for
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});