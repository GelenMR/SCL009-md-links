// libreria de node.js que permite interactuar con el sistema de archivos (file system)
const fs = require('fs');
// libreria MARKED para crear nuevas instancias en este caso objetos (Links)
const marked = require('marked');
// libreria FILEHOUND para leer/recorrer directorios
const FileHound = require('filehound');
const path = require('path');
const fetch = require('node-fetch');
const chalk = require('chalk');

// FUNCIÓN PARA SABER SI LA RUTA ES DIRECTORIO 
const isDirOrFile = (path) =>{
  return new Promise((resolve, reject) =>{
    fs.lstat(path, (err, stats) =>{
      if(err){
        // VERIFICA SI LA RUTA/ARCHIVO EXISTE
        if(err.code === 'ENOENT'){
          console.log(chalk.red('Ruta No Valida. Por Favor, Ingresar Ruta Valida.'));
        }  
      }else if(stats.isDirectory()){
      console.log('Is Directory?', stats.isDirectory());
        readDir(path)
        .then(res =>{
          console.log(chalk.blue('La Ruta Ingresda es un Directorio'));
          resolve(res);
        })
        .catch(err =>{
          reject(err);
        })
      }else{ 
        fileMD(path)
        .then(res =>{
          console.log(chalk.blue('La Ruta Ingresda es un Archivo'));
          resolve(res);
        })
        .catch(err =>{
            reject(err);
        })
      }
    })
  })
}

// FUNCIÓN QUE VERIFICA SI LA EXTECIÓN DEL ARCHIVO ES .MD
const fileMD = (file) =>{
  return new Promise((resolve, reject) =>{
    // Extención de archivo
    let ext = path.extname(file);
    console.log(chalk.green('Este Archivo es:'), chalk.yellow(ext));
    let arrayFile =[];
    if(ext === '.md'){
      arrayFile.push(file);
      readFile(arrayFile)
      .then(res=>{
        resolve(res);
      })
      .catch(err =>{
        reject(err);
      })
    }else{
      reject(console.log(chalk.red('Error: el archivo No es .md'))); 
    }
  })
}

//FUNCION PARA LEER ARCHIVO/LINKS Y CREAR ARRAY 
const readFile = (files) =>{
  return Promise.all(files.map(file =>{
    return new Promise ((resolve,reject) =>{
      fs.readFile(file,'utf8', (err, data) => {
        if (err){
          reject(err);
        }else{
        let links = [];
        // metodo para que cree una nueva instancia en el array
        const renderer = new marked.Renderer();
        renderer.link = function (herf, title, text){
        links.push({
          file:file,
          herf:herf,
          text:text
        })
        }
        marked(data,{renderer:renderer});
        resolve(links);
        }
      })
    })
  }))
}

// FUNCION LEER/RECORRER UN DIRECTORIO EN BUSCA DE ARCHIVOS .MD CON FILEHOUND
const readDir = (path) =>{
  return new Promise((resolve, reject) =>{
    FileHound.create()
    .paths(path)
    .ext('md')
    .find((err,files) =>{
      console.log(chalk.green('Cantidad de archivos', files.length ));
      if(files.length == 0){
        console.log(chalk.red('No se encontraron Archivos .md'));
      }
    })
   .then(files =>{
      files.forEach(file =>{
        readFile(files)
        .then(res =>{
          resolve(res);
        })
        .catch(err =>{
            reject(err);
        })
      })
      console.log('Archivos:', files);
    })
  })
}
const mdLinks = (path,option1,option2) =>{
  return new Promise((resolve, reject) =>{
    resolve(isDirOrFile(path));
  })
}
module.exports = mdLinks;