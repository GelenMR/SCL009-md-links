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
      console.log(chalk.blue('La Ruta Ingresda es un Directorio'));
        readDir(path)
        .then(res =>{
          Promise.all(res.map(files =>{
            console.log(chalk.blue(files));
            return readFile(files);
          }))
          .then(res=>{
            let arrLinks = [];
            res.forEach(links=>{links.map(link=>arrLinks.push(link))
              //console.log(arrLinks);
              resolve(arrLinks);
            })
            })
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
    if(ext === '.md'){
      readFile(file)
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
const readFile = (file) =>{
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
      resolve(files);
    })
    .catch(err =>{
        reject(err);
    })
  })
}

// FUNCIÓN PARA EXTRAER LINKS A VALIDAR
const linksToValidate = (path) =>{
  return new Promise((resolve, reject) =>{
    isDirOrFile(path)
    .then(res=>{
      console.log(chalk.yellow('Ingreso Opción Validate.'));
      validateOption(res)
      .then(res=>{
        resolve(res);
      })
      .catch(err=>{
        reject(err);
      })
    })
    .catch(err=>{
      reject(err);
    })
  })
}

// FUNCIÓN PARA EXTRAER INFO DEL LINK (PETICIÓN HTTP CON FETCH)
const validateOption = (files) =>{
  return Promise.all(files.map(link =>{
    return new Promise((resolve,reject)=>{
      fetch(link.herf)
      .then(res=>{
        link.status = res.statusText;
        link.code = res.status;
        resolve(link);
      })
      .catch(err=>{
        //reject(err);
        if(err){
          link.status = "FAIL";
          link.response = null;
          resolve(link);
        }
      })
    })
  }))
}

// FUNCIÓN PARA EXTRAER INFO DEL LINK (STAST)
const statsOption = (path) =>{
  let totalLinks = 0;
  let arrLinks = [];
  let uniqueLinks = 0;
  let brokenLinks = [];
  return new Promise((resolve, reject) =>{
    isDirOrFile(path)
    .then(links=>{
      arrLinks = links.map(link =>link.herf)
      totalLinks = links.length;
      uniqueLinks = [...new Set(arrLinks)].length;
      console.log(chalk.green('Links Totales:'), totalLinks, arrLinks)
      objectTotalLinks = {
        Total: totalLinks,
        Unique: uniqueLinks,
        //Broken: brokenLinks
      };
      resolve(objectTotalLinks);      
      })
    })
    .catch(err=>{
      reject(err);
    })
  
}

// VERIFICAR SI EL USUARIO INTRODUJO OPTIONS
let validate = false;
let stats = false;
const mdLinks = (path,option1,option2) =>{
  return new Promise((resolve, reject) =>{
    if(option1 === undefined && option2 === undefined){
      //console.log(chalk.yellow('No Ingreso Opciones'));
      resolve(isDirOrFile(path));
    }else if(option1 === '--validate' && option2 === '--stats' || option1 === '--stats' && option2 === '--validate'){
      validate = true;
      stats = true;
      console.log(chalk.yellow('Ingreso Opciones: Validate y Stats. Por Favor Ingresa solo una Opción.'));
      //resolve();
    }else if(option1 === '--validate' && option2 === undefined){
      validate = true;
      resolve(linksToValidate(path))
    }else if(option1 === '--stats' && option2 === undefined){
      stats = true;
      console.log(chalk.yellow('Ingreso Opcion Stats'));
      resolve(statsOption(path));
    }else{
      console.log(chalk.red('Opcion No Valida.'),'Las Opciones validas son:\n --validate\n --stats\n --validate --stats');
    }
    // console.log('Validate:', validate);
    // console.log('Stats:', stats);
  })
}
module.exports = mdLinks;