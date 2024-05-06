class UserModel {
  constructor() {
      // No es necesario tener una conexión aquí
  }

  registerUser(nombreCompleto, correo, contrasena, conexion) {
      return new Promise((resolve, reject) => {
          // Hashea la contraseña (considera usar un método más seguro)
          const contrasenaHasheada = require('crypto').createHash('md5').update(contrasena).digest('hex');

          // Inserta el usuario en la base de datos
          const consulta = `INSERT INTO usuarios (nombre_completo, correo, usuario, contrasena) VALUES (?, ?, ?, ?)`;
          const valores = [nombreCompleto, correo, nombreCompleto.toLowerCase().replace(/\s+/g, '_'), contrasenaHasheada];

          console.log('Consulta SQL para registro de usuario:', consulta); // Mensaje de depuración
          console.log('Valores para la consulta:', valores); // Mensaje de depuración

          conexion.query(consulta, valores, (err, resultado) => {
              if (err) {
                  console.error('Error al registrar al usuario:', err);
                  reject('Error al registrar al usuario');
              } else {
                  console.log('¡Usuario registrado con éxito!');
                  resolve('¡Usuario registrado con éxito!');
              }
          });
      });
  }

  loginUser(correo, contrasena, conexion) {
      return new Promise((resolve, reject) => {
          // Hashea la contraseña (considera usar un método más seguro)
          const contrasenaHasheada = require('crypto').createHash('md5').update(contrasena).digest('hex');

          // Verifica las credenciales en la base de datos
          const consulta = `SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?`;
          const valores = [correo, contrasenaHasheada];

          console.log('Consulta SQL para inicio de sesión:', consulta); // Mensaje de depuración
          console.log('Valores para la consulta:', valores); // Mensaje de depuración

          conexion.query(consulta, valores, (err, resultados) => {
              if (err) {
                  console.error('Error al ejecutar la consulta:', err);
                  reject('Error al intentar iniciar sesión');
              } else {
                  if (resultados.length > 0) {
                      // Usuario autenticado correctamente
                      console.log('¡Usuario autenticado con éxito!');
                      resolve('¡Usuario autenticado con éxito!');
                  } else {
                      // Credenciales incorrectas
                      console.log('Credenciales incorrectas');
                      reject('Error: Credenciales incorrectas. Verifica tu correo y contraseña.');
                  }
              }
          });
      });
  }

  // Agrega otros métodos relacionados con la gestión de usuarios según tus necesidades
}

module.exports = UserModel;
