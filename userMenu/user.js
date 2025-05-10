window.onload = function loadUser(){
    let userName = JSON.parse(localStorage.users).name;
    document.getElementById("user-name").innerText = `${userName}`;

    const contenedor = document.getElementById('list-favorites');
    contenedor.innerHTML = '';

    let favoritos = JSON.parse(localStorage.favoritos);
    for(let i=0; i< favoritos.lenght; i++){

            const item = document.createElement('li');
            item.className = 'list-group-item';
            item.innerHTML = favoritos[i].title;
            
            contenedor.appendChild(item);
          
    }
}
