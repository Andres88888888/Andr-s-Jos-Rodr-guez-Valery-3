// Codigo utilizado para implementar la api de Firebase

// Se implementan las caracteristicas generales de Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

/*Se implementan las caracteristicas de la libreria de autentificacion de firebase, llamando las librerias para:
  - Conectar con la base de datos, proceso realizado por el metodo "getAuth()"
  - Crear una nueva cuenta de usuario, proceso realizado por el metodo "createUserWithEmailAndPassword()"
  - Conectar a la cuenta de un usuario, proceso realizado por el metodo "signInWithEmailAndPassword()"
*/
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// Datos dados por Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCo3c8ndwXpYbt8z_0m5ecy1sX2DLedelA",
    authDomain: "autentificacion-327d7.firebaseapp.com",
    projectId: "autentificacion-327d7",
    storageBucket: "autentificacion-327d7.appspot.com",
    messagingSenderId: "55938590014",
    appId: "1:55938590014:web:5365f8bdeeaa20239bb86f",
  };

// Se inicia Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

//Codigo del registro
  // Primero se comprueba si se esta ejecutando la pagina con el formulario de registro, cuyo de boton de "Enviar" posee el identificador "submit_registro", el cual es utilizado para la verificacion. Si se detecta el boton, se procede a realizar el proceso de registro
    if (document.getElementById('submit_registro') != null) {

      // Se almacena el boton de enviar del formulario en la constante "submit_r"
        const submit_r = document.getElementById('submit_registro')

      // Se agrega un evento al boton de envia, donde si es precionado, se anula el proceso de reiniciar la pagina automaticamente y se realizan los procedimiento de la funcion flecha "e", en el cual se realiza una promesa
        submit_r.addEventListener("click", async (e) => {
          e.preventDefault()

          // Se almacenan los valores ingresados del correo y de la contraseña en las constantes email_r y password_r respectivamente
            const email_r = document.getElementById('email_registro').value
            const password_r = document.getElementById('password_registro').value

          // Se procede a intentar ver si se cumple la promesa de que se ejecute la funcion createUserWithEmailAndPassword(), si se cumple, se informara al usuario con una alerta y se le redigira a la pagina de Ingreso
            try {
              await createUserWithEmailAndPassword(auth, email_r, password_r)
              alert("Usuario agregado existosamente")
              window.location.href = "Ingreso.html";
            } 

          // Si no se cumple la promesa, quiere decir que ocurrio un error, para lo cual se usara la variable "error", que es propio de firebase, y en este se almacena que errores ocurrieron; de alli se usa la propiedad ".code" para leer cual es el codigo que informa del error observado en el procedimiento y de alli se usa una seire de "if...else" para que segun el caso que sea visualizado, presentar una alerta al usuario avisando del error detectado.
            catch (error) {
              if (error.code === 'auth/email-already-in-use') {
                alert("Correo ya en uso")
              } else if (error.code === 'auth/invalid-email') {
                alert("Correo invalido")
              } else if (error.code === 'auth/weak-password') {
                alert("La contraseña debe ser de almenos 6 caracteres")
              } else if (email_r.length == 0) {
                alert("Ingrese un correo")
              } else if (password_r.length == 0) {
                alert("Ingrese una contraseña")
              } else if (error.code) {
                alert("Algo a fallado")
              }
          }
        })
    }

//Codigo del ingreso
  // Primero se comprueba si se esta ejecutando la pagina con el formulario de ingreso, cuyo de boton de "Enviar" posee el identificador "submit_ingreso", el cual es utilizado para la verificacion. Si se detecta el boton, se procede a realizar el proceso de ingreso
    if (document.getElementById('submit_ingreso') != null) {

      // Se almacena el boton de enviar del formulario en la constante "submit_i"
        const submit_i = document.getElementById('submit_ingreso')
      
      // Se agrega un evento al boton de enviar, donde si es precionado, se anula el proceso de reiniciar la pagina automaticamente y se realizan los procedimiento de la funcion flecha "f", en el cual se realiza una promesa
        submit_i.addEventListener("click", async (f) => {
          f.preventDefault()

          // Se almacenan los valores ingresados del correo y de la contraseña en las constantes email_i y password_i respectivamente
            const email_i = document.getElementById('email_ingreso').value
            const password_i = document.getElementById('password_ingreso').value

          // Se procede a intentar ver si se cumple la promesa de que se ejecute la funcion signInWithEmailAndPassword(), si se cumple, se informara al usuario con una alerta y se le redigira a la pagina de Productos
            try {
              await signInWithEmailAndPassword(auth, email_i, password_i)
              alert("Ingresando a la cuenta...")
              window.location.href = "Productos.html";
            }

          // Si no se cumple la promesa, quiere decir que ocurrio un error, se debe presentar una alerta al usuario avisando del error detectado. Por desgracia no he podido encontrar un condigo de error funcional para que se avise al usuario de los problemas mas comunes, asi que se decidio resumir en 3 problemas generales.
            catch (error) {
              if (email_i.length == 0) {
                alert("Ingrese un correo")
              } else if (password_i.length == 0) {
                alert("Ingrese una contraseña")
              } else if (error.code) {
                alert("Algo a fallado")
              }
            }
        })
    }

