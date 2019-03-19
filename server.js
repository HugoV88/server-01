/*Instrucciones
    1. Descargar la librería de Express y HBS (Handdlebars).
    2. Definir la función Express y configurar una solicitud GET.
    3. Crear un middleware (instrucción que siempre se ejecutará sin importar el URL) estático, para que pueda leer los archivos css, js y demas con un PATH absoluto (__dirname + '/public').
    4. Para crear las páginas del sitio web, se van a crear con la extensión .hbs de handlebars en '/views' para darle dinamismo. Los archivos de edición irán a '/public/assets/' 
    5. Para que la página pueda renderizar con handlebars, se utiliza el default view engine de la librería hbs.
    6. Crear variables dinámicas para manejar por ejemplo el nombre y el año. {{ var }}
    7. Hasta el momento no se ha utilizado la librería de HBS. Ahora utilizaremos los Parciales de dicha librería para crear contenido dinámico en la página como por ejemplo el nav, header, footer, etc. Los parciales se guardarán en './views/partials'. Ej: {{> Partial }}
    8. Para optimizar el código se pueden utilizar helpers de la librería hbs, que son funciones que se disparan cuando lo requiere el template. 
    9. Se desconoce el puerto que nos dará Heroku para la app, así que se configura una variable de entorno global
*/

/* (1) Requires */
const express = require('express');
const hbs = require('hbs');

/* (2) Definicion de la funcion Express para construir el servidor HTTP */
const app = express();

/* (3) Middleware estático para ejecutar los archivos que configuran el index */
app.use(express.static(__dirname + '/public'));

/* (8) Helpers para utilizar en funciones que se repiten 
hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
});
Y se exporta a un nuevo archivo
*/
/* Se importan los Helpers */
require('./hbs/hbs');

/* (7) Método para cargar los parciales de un directorio dinámico */
hbs.registerPartials(__dirname + '/views/partials')

/* (5) Difinición de hbs como motor de vista predeterminado, y se procede a llamar res.render en la solicitud GET  */
app.set('view engine', /* Se puede cambiar la extensión */ 'hbs');

/* (9) Variable de entorno global, el process.env.PORT no existirá localmente*/
const port = process.env.PORT || 3000

/* (2) Solicitudes HTTP GET */
app.get('/', (req, res) => {
    /* (5)(6) Para dar una respuesta se renderiza el archivo home.hbs */
    res.render('home', /* Variable Dinámica */ {
        nombre: 'Hugo Vargas'
    });
});
app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
})