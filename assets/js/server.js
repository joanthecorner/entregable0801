const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const UserController = require('../../controller/userController');

const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Configuración básica de CORS
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conexion = mysql.createConnection({
  host: 'database-2.c5l2egydpekn.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'DoXwEAgRJsSrij9nbeSO',
  port: 3310, // Cambiado al puerto proporcionado por AWS RDS
  database: 'gymproyecto',
});

conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Configuración para servir archivos estáticos desde la carpeta 'A'
app.use(express.static(path.join(__dirname, '../../../A')));

// Crear una instancia de UserController y pasarle la conexión a la base de datos
const userController = new UserController(conexion);

// Ruta para el archivo login.html
app.get('/view/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../A/view', 'login.html'));
});

// Rutas sin configuración CORS específica
/*app.post('/register', (req, res) => {
  console.log("Solicitud POST recibida en /register");
  userController.registerUser(req, res);
});
*/
app.post('/register', (req, res) => {
  console.log('Solicitud POST recibida en /register');
  // Aquí puedes incluir la lógica para registrar al usuario en tu base de datos si es necesario
  // Luego, redirige al usuario a la página de inicio de sesión después de registrarse
  res.redirect('/view/login.html');
});



app.post('/login', (req, res) => {
  userController.loginUser(req, res);
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
