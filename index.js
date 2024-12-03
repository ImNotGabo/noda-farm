const fs = require('fs');

// Blocking, synchronous way
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
*/

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (_, data1) => {
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

console.log('Will read file!');

