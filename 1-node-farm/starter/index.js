// Connecting a core module  
const fs = require('fs'); // fs = file system
const http = require('http'); // http module 
const url = require('url'); // url module 

const slugify = require('slugify');

// Adding own module
const replaceTemplate = require('./modules/replaceTemplate');
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

// Creating an array of all the slugs
const slugs = dataObject.map(el => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
    // Getting the path (always starts with '/')
    const { query, pathname } = url.parse(req.url, true); // using ES6 to pull out both object keys

    // Overview page
    if(pathname === '/' || pathname === '/overview'){
        // Read the template overview. We are also reading it to memory
        res.writeHead(200, { 'Content-type': 'text/html' }); // Server is now looking for HTML,

        // looping through the data to return the array of values & then turn it into a string
        const cardsHTML = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARD%}/g, cardsHTML);
        res.end(output);
    }else if(pathname === '/product'){ // Product page
        // Pulling the product by the query string
        const product = dataObject[query.id];
        res.writeHead(200, { 'Content-type': 'text/html' }); // Server is now looking for HTML
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    }else if (pathname === '/api'){ // API page
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