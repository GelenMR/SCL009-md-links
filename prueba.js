// module.exports = () => {
//   // ...
// };

// libreria de node.js que permite interactuar con el sistema de archivos (file system)
const fs = require('fs');
// libreria MARKED para crear nuevas instancias en este caso objetos (Links)
const marked = require('marked');
// libreria FILEHOUND para leer/recorrer directorios
const FileHound = require('filehound');
// // libreria YARGS para leer Argumentos(Option)
// const yargs = require('yargs');
 
// GUARDA EN UNA VARIABLE EL ARGUMENTO QUE ESCRIBE EL USUARIO EN LA TERMINAL(PATH)
let pathToFile = process.argv[2];
console.log("path to file", pathToFile);

// fs.readFile('/etc/passwd', (err, data) => {
//   if (err) throw err;
//   console.log(data);
//});
// // metodo para que lea el archivo, *utf8* es el idioma en que le estamos pasando la info
// fs.readFile('./prueba.md','utf8', (err, data) => {
//   if (err){
//     throw err;
//   } 
//   console.log(data);
// });

// // LEER/RECORRER UN DIRECTORIO EN BUSCA DE ARCHIVOS .MD CON FILEHOUND
// const files = (path) =>{
//   FileHound.create()
//   .paths(path)
//   .ext('md')
//   .find()
//  .then(files =>{
// files.forEach(file =>console.log('Found file', file));
// })
// };
// console.log(files('../SCL009-md-links'))

//   // FUNCIÓN LEER ARCHIVO DESDE DIRECTORIO
//   const dirPath = (path) => {
//     fs.readdir(path,'utf8', (err, data) => {
//         if (err){
//         throw err;
//         }
//     })
//   }
// LEER DIRECTORIO CON READDIR (No se usara pues para sacar las url absolutas hay que realizar mas pasos)
// const links = (path)=>{
//   fs.readdir(path,'utf8', (err, data)=>{
// if (err){
//   throw err;
// } 
// console.log(data)
//   })
// }
// console.log(links('../SCL009-md-links'))

// // LEER UN ARCHIVO Y CREAR ARRAY CON OBJETOS-LINKS
// const links = (path) =>{
//   // metodo para que lea el archivo
//   fs.readFile(path,'utf8', (err, data) => {
//     if (err){
//     throw err;
//     }
//     // creando el array(nueva instancia) con libreria marked y metodo Renderer
//     let links = [];
//     const renderer = new marked.Renderer();
//     renderer.link = function (herf, title, text){
//       links.push({
//         herf:herf,
//         text:text,
//         file:path
//       })
//     }
//     marked(data,{renderer:renderer});
//     console.log(links)
//   }) 
// }
// console.log(links('./prueba.md'));