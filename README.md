# NodeJS

## ¿Qué es Node.js?

Node.js es un entorno de ejecución de JavaScript basado en el motor V8 de Google Chrome, que permite ejecutar código JavaScript en el servidor. A diferencia de otros entornos tradicionales, Node.js utiliza un modelo de entrada/salida no bloqueante y orientado a eventos, lo que lo hace extremadamente eficiente y escalable, especialmente en aplicaciones que manejan múltiples conexiones simultáneamente, como API REST, aplicaciones en tiempo real y servidores web.

## ¿Por qué Node.js?

Node.js es ideal para desarrolladores que buscan crear aplicaciones web modernas, rápidas y escalables. Su arquitectura asíncrona y basada en eventos permite manejar grandes cantidades de solicitudes sin consumir muchos recursos. Además, al utilizar JavaScript tanto en el cliente como en el servidor, facilita el desarrollo full-stack, promoviendo una mayor coherencia en el código y una curva de aprendizaje más rápida para quienes ya dominan este lenguaje.

## Lectura y Escritura de Archivos en Node.js

Este script en Node.js realiza la lectura de un archivo de texto de entrada (`input.txt`), y genera un nuevo archivo de salida (`output.txt`) con contenido adicional.

### Código

```javascript
// Importación del módulo 'fs' para trabajar con el sistema de archivos
const fs = require('fs');

// Leer el contenido del archivo 'input.txt'
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// Crear un nuevo archivo 'output.txt' con contenido dinámico
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
```

