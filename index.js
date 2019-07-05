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

mdLinks(pathToFile)
    .then(res=>{
        console.log('Soy Index:',res);
      })
      .catch(err=>{
        console.log('Soy Error Index:',err);
      })
