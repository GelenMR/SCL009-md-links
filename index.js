#!/usr/bin/env node

const mdLinks = require('./md-links.js')
const path = require('path');
/* GUARDA EN UNA VARIABLE EL ARGUMENTO QUE ESCRIBE EL USUARIO 
EN LA TERMINAL(PATH) */
let pathToFile = process.argv[2];
console.log('path to file:', pathToFile);
// Path Absoluto
pathToFile = path.resolve(pathToFile);
pathToFile = path.normalize(pathToFile);
console.log('path absolute:', pathToFile);
// Argumeto en index 3
let option1 = process.argv[3];
console.log('Option 1 to file:', option1);
// Argumeto en index 4
let option2 = process.argv[4];
console.log('Option 2 to file:', option2);

mdLinks(pathToFile, option1, option2)
    .then(res=>{
        console.log('Soy Index:',res);
      })
      .catch(err=>{
        console.log('Soy Error Index:',err);
      })
