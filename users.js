
class User {
    id = 0;
    name = '';
    email = '';
    pw = '';
    favoriteAnimes = [];
    
    constructor(nombre, id, favoritos){
        this.name = nombre;
        this.id = id;
        this.favoriteAnimes = favoritos;
    }
}

//

//let users = JSON.parse(localStorage.getItem("users")) || [];


// REGISTER
function register() {
  
    const correo = document.getElementById("correo").value;
    const contrasenia = document.getElementById("contraseña").value;
    const nombreUsuario = document.getElementById("usuario").value;
  
    // Obtener la base de datos actual
    //let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Crea nuevo usuario
    const nuevoUsuario = {
      name: nombreUsuario,
      email: correo,
      pw: contrasenia,
      favoritos: []
    };
  
    //users.push(nuevoUsuario);
  
    // Guardar de nuevo en localStorage
    localStorage.setItem("users", JSON.stringify(nuevoUsuario));
  
    alert("Usuario guardado exitosamente.");
  };



  // Tratando de iniciar sesion
  function loggin() {
    //const correo = document.getElementById("correo").value;
    const nombreUsuario = document.getElementById("usuario").value;
    const contrasenia = document.getElementById("contraseña").value;
  
    let users = JSON.parse(localStorage.getItem("users"));
    //let users = localStorage.getItem("users");

    //Buscar usuario
    //const usuario = users.find(u => u.name === nombreUsuario);

    const mensajeError = document.getElementById("mensajeError");

    if(nombreUsuario == users.name){
        if(contrasenia == users.pw){
            isLoged = true;
            localStorage.setItem("loged", JSON.stringify(true));
            userLoged();
            window.location.href = "/index.html";
        } else {
            mensajeError.textContent = "Contraseña incorrecta.";
            mensajeError.style.display = "block"; // mostrar mensaje
        }
    } else {
        mensajeError.textContent = "Correo o contraseña incorrectos.";
        mensajeError.style.display = "block"; // mostrar mensaje
    }
  };


window.onload = userLoged();
async function userLoged() {
    const userButton = document.getElementById("userButton");
    try {
        let userName = JSON.parse(localStorage.users).name;
        userButton.innerText = userName;
        userButton.href = "/userMenu/user.html";
    } catch {
        //console.log("USER BUTTON ERROR!");
    }
}