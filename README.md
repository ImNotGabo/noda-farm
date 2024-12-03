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

# Naturaleza Asincrónica de Node.js

Node.js es un entorno de ejecución de **hilo único**, diseñado para manejar aplicaciones escalables y de alto rendimiento. Sin embargo, esta arquitectura puede generar problemas cuando se ejecuta **código sincrónico bloqueante**, ya que **bloquea** la ejecución de todas las operaciones mientras se espera que una tarea termine.

## Sincronía vs Asincronía

- **Código Sincrónico (Bloqueante)**: Cada operación debe completarse antes de pasar a la siguiente.
- **Código Asincrónico (No Bloqueante)**: Las tareas pesadas se ejecutan en segundo plano, permitiendo que el resto del código continúe ejecutándose.

### Ejemplo 1: Código Sincrónico

```js
const fs = require('fs');
const data = fs.readFileSync('archivo.txt', 'utf-8'); // Bloquea el hilo
console.log('Archivo leído:', data); // No se ejecuta hasta que el archivo es leído
```

## Lectura y Escritura de Archivos Asíncrona en Node.js

Este ejemplo muestra cómo trabajar con archivos de manera **asíncrona** en Node.js utilizando el módulo `fs`.

### Explicación:

- **Lectura Asíncrona**: Usamos `fs.readFile` para leer archivos sin bloquear el hilo principal.
- **Escritura Asíncrona**: Con `fs.writeFile`, escribimos en un archivo de manera no bloqueante.
- **Encadenamiento de Lecturas**: Se leen varios archivos en secuencia, donde el resultado de una lectura se pasa como entrada a la siguiente.

### Ejemplo de Código:

```javascript
const fs = require('fs');

// Leer el archivo start.txt, obtener el nombre del siguiente archivo y leerlo
fs.readFile('./txt/start.txt', 'utf-8', (_, data1) => {
	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (_, data2) => {
		console.log(data2);

		// Leer append.txt y combinar el contenido con el archivo anterior
		fs.readFile('./txt/append.txt', 'utf-8', (_, data3) => {
			console.log(data3);

			// Escribir el contenido combinado en final.txt
			fs.writeFile(
				'./txt/final.txt',
				`${data2}\n${data3}`,
				'utf-8',
				(error) => {
					if (error) {
						console.error(error);
					} else {
						console.log('Archivo escrito con éxito');
					}
				}
			);
		});
	});
});

console.log('Se leerá el archivo!');
```

