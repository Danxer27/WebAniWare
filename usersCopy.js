
class User {
    id = 0;
    name = '';
    favoriteAnimes = [];
    
    constructor(nombre, id, favoritos){
        this.name = nombre;
        this.id = id;
        this.favoriteAnimes = favoritos;
    }
}

let isLoged = false;

let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("registerBtn").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const correo = document.getElementById("exampleInputEmail1").value;
    const contrasenia = document.getElementById("exampleInputPassword1").value;
    const nombreUsuario = document.getElementById("exampleUserName").value;
  
    // Obtener la base de datos actual
    //let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Crea nuevo usuario
    const nuevoUsuario = {
      id: users.length + 1,
      name: nombreUsuario,
      email: correo,
      pw: contrasenia
    };
  
    users.push(nuevoUsuario);
  
    // Guardar de nuevo en localStorage
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Usuario guardado exitosamente.");
  });


  // Tratando de iniciar sesion
  document.getElementById("loginBtn").addEventListener("submit", function(event) {
    event.preventDefault();
  
    //const correo = document.getElementById("exampleInputEmail1").value;
    const contrasenia = document.getElementById("exampleInputPassword1").value;
    const nombreUsuario = document.getElementById("exampleUserName").value;
  
    //let users = JSON.parse(localStorage.getItem("users")) || [];

    //Buscar usuario
    const usuario = users.find(u => u.name === nombreUsuario);
  
    const mensajeError = document.getElementById("mensajeError");

    if(usuario){
        if(contrasenia == usuario.pw){
            isLoged = true;
            document.getElementById("userButton").innerText = usuario.name;
            window.location.href = "/index.html";
        }
    } else {
        mensajeError.textContent = "Correo o contraseña incorrectos.";
        mensajeError.style.display = "block"; // mostrar mensaje
    }
  });



// Boton de usuario / login
// document.getElementById("userButton").addEventListener("submit", function(event) {
//     event.preventDefault();
  
//     if(isLoged){
//         window.location.href = "/userMenu/user.html";
//     }
// });


const loadUserName = async () => {
    if(isLoged){
        document.getElementById("userButton").innerText = usuario.name;
        document.getElementById("userButton").href = "/userMenu/user.html";
    }
}; 

window.onload = loadUserName;