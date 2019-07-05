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
})