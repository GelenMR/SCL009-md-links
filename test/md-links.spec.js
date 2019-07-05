const mdLinks = require('../md-links.js');

describe('mdLinks', () => {
  it('Deberia ser una función', () => {
    expect(typeof (mdLinks)).toBe('function');
  });
  it('Deberia leer un archivo .md y retornar los links encontrados', () =>{
    expect(mdLinks('./prueba.md')).resolves.toBe([
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/workshopper/learnyounode',
        text: 'learnyounode'
      },
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/workshopper/how-to-npm',
        text: 'how-to-npm'
      },
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/stevekane/promise-it-wont-hurt',
        text: 'promise-it-wont-hurt'
      }
    ]);
  });
  it('Debería retornar error si el archivo no existe', ()  => {
    expect(mdLinks('./prueba1.md')).rejects.toEqual('Ruta No Valida. Por Favor, Ingresar Ruta Valida.');
  });
  it('Deberia retornar error si el archivo no es .md', () =>{
    expect(mdLinks('./prueba.js')).rejects.toEqual('Error: el archivo No es .md');
  });

  it('Deberia recorrer un directorio y retornar los links encontrados dentro de los archivo .md que contenga', () =>{
     expect(mdLinks('./prueba-md')).resolves.toBe(
       [
         [
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
             herf: 'https://github.com/workshopper/learnyounode',
             text: 'learnyounode'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
             herf: 'https://github.com/workshopper/how-to-npm',
             text: 'how-to-npm'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
             herf: 'https://github.com/stevekane/promise-it-wont-hurt',
             text: 'promise-it-wont-hurt'
           }
         ],
         [
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
             herf: 'https://nodejs.org/es/about/',
             text: 'Acerca de Node.js - Documentación oficial'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
             herf: 'https://es.wikipedia.org/wiki/Node.js',
             text: 'Node.js - Wikipedia'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
             herf: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
             text: 'What exactly is Node.js? - freeCodeCamp'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
             herf: 'https://www.drauta.com/que-es-nodejs-y-para-que-sirve',
             text: '¿Qué es Node.js y para qué sirve? - drauta.com'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
             herf: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
             text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
             herf: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
             text: '¿Simplemente qué es Node.js? - IBM Developer Works, 2011'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
             herf: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
             text: 'Node.js y npm'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
             herf: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
             text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?'
           }
         ],
         [
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba3.md',
             herf: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
             text: 'Publicar packpage'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba3.md',
             herf: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
             text: 'Crear módulos en Node.js'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba3.md',
             herf: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
             text: 'Leer un archivo'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba3.md',
             herf: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
             text: 'Leer un directorio'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba3.md',
             herf: 'https://nodejs.org/api/path.html',
             text: 'Path'
           },
           {
             file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba3.md',
             herf: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
             text: 'Linea de comando CLI'
           }
         ]
       ]);
   });
})