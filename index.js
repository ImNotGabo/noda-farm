const fs = require('fs');
const http = require('http');
const url = require('url');

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

const server = http.createServer((req, res) => {
	console.log(req.url);
	const pathName = req.url;
	if (pathName === '/' || pathName === '/overview') {
		res.end('This is OVERVIEW');
	} else if (pathName === '/product') {
		res.end('This is PRODUCT');
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

