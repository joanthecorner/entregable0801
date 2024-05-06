const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const UserController = require('../../controller/userController');

const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
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
  port: 3310,
  database: 'gymproyecto',
});

conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

app.use(express.static(path.join(__dirname, '../../../A')));

const userController = new UserController(conexion);

app.get('/view/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../A/view', 'login.html'));
});

app.post('/register', (req, res) => {
  console.log('Solicitud POST recibida en /register');
  console.log('Datos recibidos:', req.body);
  res.redirect('/view/login.html');
});

app.post('/login', (req, res) => {
  userController.loginUser(req, res);
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
