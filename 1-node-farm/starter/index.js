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

// Broken out to make it a top-level code so it doesnt get executed each time there is a request
// Making the method sync
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); // Getting file path in project to get JSON data
const dataObject = JSON.parse(data);
// Reading each template and keeping it in memory so we are not calling each time page is loaded
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const replaceTemplate = (temp, product) => {
    // Uses regular expression to replace all the instances of the product name
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
    output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
    output = output.replace(/{%PRODUCT_ID%}/g, product.id);
    output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
    output = output.replace(/{%PRODUCT_NUTRI%}/g, product.nutrients);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
    if(!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    return output;
}

const server = http.createServer((req, res) => {

    const pathName = req.url; // Getting the path (always starts with '/')
    // Overview page
    if(pathName === '/' || pathName === '/overview'){
        // Read the template overview. We are also reading it to memory
        res.writeHead(200, { 
            'Content-type': 'text/html', // Server is now looking for HTML,
            'my-own-header': 'hello-world'
        });
        /* looping through the data to return the array of values & then turn it into a string */
        const cardsHTML = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARD%}/g, cardsHTML);
        // console.log(cardsHTML);

        res.end(output);
    }else if(pathName === '/product'){ // Product page
        res.end('This is the product');
    }else if (pathName === '/api'){ // API page
        res.writeHead(200, { 'Content-type': 'application/json' }); // Making sure the browser knows to look for JSON
        res.end(data); // Calling the data we get back from our top-level code
    }else{ // Not found page
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