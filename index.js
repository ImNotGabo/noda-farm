import { readFileSync, writeFileSync } from 'fs';

const textIn = readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
writeFileSync('./txt/output.txt', textOut);
console.log('File written!');

