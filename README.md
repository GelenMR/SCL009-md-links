# md-Links - Libreria en npm

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Este modulo permite _extraer links_ de archivos markdown(.md), _validar su status_ y obtener algunas _estadisticas_ de estos.

# Guía de Uso e Instalación
## Uso
```js
const mdLinks = require ( 'gelenmr-md-links' ) ;   
```
## Instalación

Con el comando `npm install gelenmr-md-links` podemos instalar directamente. Ver [docs oficiales de `npm install` acá](https://docs.npmjs.com/cli/install).

### JavaScript API

El módulo puede importarse en otros scripts de Node.js mediante la siguiente interfaz:  `mdLinks(path, options)`

#### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio. 
- `options`: puede ser una de las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links encontrados.
  * `stats`: Booleano que determina si se desea obtener un texto con estadísticas básicas sobre los links.

## CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación puede ejecutarse de la siguiente manera a través de la terminal:

`md-links <path-to-file> [options]`

#### Por ejemplo:

```js
$ md-links ./some/example.md
Links Encontrados: [
  {
  file: ./some/example.md,
  href: http://algo.com/2/3/, 
  text: Link a algo
  }
]
```

Si pasamos la opción `--validate` el  _output_ en este caso incluye la palabra `ok` o `fail`, así como el status de la respuesta recibida a la petición HTTP a dicha URL.
```js
$ md-links ./some/example.md --validate
Links Encontrados: [
  {
  file: ./some/example.md,
  href: http://algo.com/2/3/,
  text: Link a algo,
  status: OK,
  code: 200
  }
]
```
Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```js
$ md-links ./some/example.md --stats
Links Encontrados: { Total: 3, Unique: 3 }
```
## Documentación técnica

#### Dependencias:

    "chalk": "^2.4.2",
    "eslint": "^6.0.0",
    "filehound": "^1.17.0",
    "marked": "^0.6.2",
    "node-fetch": "^2.6.0"
    "jest": "^24.8.0",

### Planificación
[Enlase a Planificacion del proyecto en trello](https://trello.com/b/Oq7vquwp/markdown-links)

### Recursos

- [Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)
- [What exactly is Node.js? - freeCodeCamp](https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5)
- [Node.js y npm](https://www.genbeta.com/desarrollo/node-js-y-npm)
- [Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?](http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)
- [NPM](https://docs.npmjs.com/getting-started/what-is-npm)

## Checklist

### General

- [x] Puede instalarse via `npm install --global <github-user>/md-links`

### CLI

- [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [x] Se ejecuta sin errores / output esperado
- [x] Implementa `--validate`
- [x] Implementa `--stats`

#### Autor: Gelen Montilla. Laboratoria 2019.