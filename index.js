const fs = require('fs');
const http = require('http');
const { URL } = require('url');
const { replaceTemplate } = require('./modules/replaceTemplate');
// const url = require('url'); // Deprecated

//////////////////////////////////////////
// FILES

// Blocking, synchronous way
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
*/

// Non-blocking, asynchronous way
/* fs.readFile('./txt/start.txt', 'utf-8', (_, data1) => {
	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (_, data2) => {
		// console.error(error2);
		console.log(data2);
		fs.readFile('./txt/append.txt', 'utf-8', (_, data3) => {
			// console.error(error3);
			console.log(data3);
			fs.writeFile(
				`./txt/final.txt`,
				`${data2}\n${data3}`,
				'utf-8',
				(error) => {
					console.error(error);
					console.log('File has been written');
				}
			);
		});
	});
});

console.log('Will read file!'); */

//////////////////////////////////////////
// SERVER

// Top-lvl code to execute one time
const templateOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8'
);
const templateCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8'
);
const templateProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
	const BASE_URL = `http://127.0.0.1:8000`;
	const myURL = new URL(`${BASE_URL}${req.url}`);
	const { searchParams, pathname: pathName } = myURL;

	// Overview page
	if (pathName === '/' || pathName === '/overview') {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});

		const cards = productData
			.map((element) => replaceTemplate(templateCard, element))
			.join('');
		const output = templateOverview.replace('{%PRODUCT_CARDS%}', cards);
		res.end(output);

		// Product page
	} else if (pathName === '/product') {
		const product = productData.find(
			(element) => element.id === +searchParams.get('id')
		);
		console.log(searchParams);
		output = replaceTemplate(templateProduct, product);
		res.end(output);

		// API
	} else if (pathName === '/api') {
		fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (_, data) => {
			res.writeHead(200, {
				'Content-type': 'application/json',
			});
			res.end(data);
		});

		// Not found
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world',
		});
		res.end('<h1>Page not found</h1>');
	}
});
server.listen(8000, '127.0.0.1', () => {
	console.log('Listening to request on port 8000.');
});

