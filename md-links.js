// libreria de node.js que permite interactuar con el sistema de archivos (file system)
const fs = require('fs');
// libreria MARKED para crear nuevas instancias en este caso objetos (Links)
const marked = require('marked');
// libreria FILEHOUND para leer/recorrer directorios
const FileHound = require('filehound');

/* GUARDA EN UNA VARIABLE EL ARGUMENTO QUE ESCRIBE EL USUARIO 
EN LA TERMINAL(PATH) */
let pathToFile = process.argv[2];
console.log("path to file:", pathToFile);
//console.log(`${index}: ${pathToFile}`);

// // FUNCIÓN LEER ARCHIVO
// const readFile = (path) => {
//     fs.readFile(path,'utf8', (err, data) => {
//         if (err){
//         throw err;
//         }
//         console.log(data);
//     })
// }
// console.log(readFile(pathToFile));

//FUNCION PARA LEER ARCHIVO/LINKS Y CREAR ARRAY 
// const links = (path) =>{
//     fs.readFile(path,'utf8', (err, data) => {
//         if (err){
//         throw err;
//         }
//         let links = [];
//         // metodo para que cree una nueva instancia en el array
//         const renderer = new marked.Renderer();
//         renderer.link = function (herf, title, text){
//         links.push({
//             herf:herf,
//             text:text,
//             file:path
//             })
//         }
//     marked(data,{renderer:renderer});
//     console.log(links)
//     })
// }
// console.log(links(pathToFile));

// FUNCION LEER/RECORRER UN DIRECTORIO EN BUSCA DE ARCHIVOS .MD CON FILEHOUND
const readDir = (path) =>{
    FileHound.create()
    .paths(path)
    .ext('md')
    .find()
   .then(readDir =>{
    readDir.forEach(file =>console.log('Found file', file));
  })
}
return(readDir(pathToFile));

// FUNCIÓN QUE CONTIENE NUESTRO METODO
const mdLinks = (path, options) =>{

}
