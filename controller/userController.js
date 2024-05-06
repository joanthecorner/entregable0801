// A/controller/userController.js
const UserModel = require('../model/user');

class UserController {
  constructor(conexion) {
    this.userModel = new UserModel(conexion);
    this.conexion = conexion; // Guarda la conexión como una propiedad de la instancia
  }

  registerUser(req, res) {
    const { nombreCompleto, correo, contrasena } = req.body;

    console.log('Intento de registro con datos:', req.body); // Mensaje de depuración

    if (!nombreCompleto || !correo || !contrasena) {
      console.error('Datos incompletos para el registro');
      return res.status(400).send('Datos incompletos para el registro');
    }

    // Realiza validaciones adicionales según tus necesidades

    // Usa this.conexion en lugar de conexion
    this.userModel.registerUser(nombreCompleto, correo, contrasena, this.conexion)
    .then((message) => {
      console.log('Usuario registrado con éxito:', message); // Mensaje de depuración
      // Redirige al usuario a la página de inicio de sesión después del registro exitoso
      res.redirect('/view/login.html');
    })
      .catch((error) => {
        console.error('Error al intentar registrar usuario:', error); // Mensaje de depuración
        res.status(500).send('Error interno del servidor al registrar usuario');
      });
  }
  loginUser(req, res) {
    const { correo, contrasena } = req.body;
    console.log('Intento de inicio de sesión con correo:', correo);

    if (!correo || !contrasena) {
      console.error('Correo o contraseña faltante para iniciar sesión');
      return res.status(400).send('Correo o contraseña faltante para iniciar sesión');
    }

    this.userModel.loginUser(correo, contrasena, this.conexion)
    .then(() => {
        console.log('¡Usuario autenticado con éxito!');
        res.status(200).json({ message: '¡Usuario autenticado con éxito!' });
      })
      .catch((error) => {
        console.error('Error al intentar iniciar sesión:', error);

        if (error.message === 'Credenciales incorrectas') {
          res.status(401).json({ error: 'Credenciales incorrectas. Verifica tu correo y contraseña.' });
        } else {
          res.status(500).json({ error: 'Error interno del servidor al iniciar sesión' });
        }
      });
  }
}

module.exports = UserController;
