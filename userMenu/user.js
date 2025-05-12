// window.onload = function loadUser(){
//     let userName = JSON.parse(localStorage.users).name;
//     document.getElementById("user-name").innerText = `${userName}`;

//     const contenedor = document.getElementById('list-favorites');
//     contenedor.innerHTML = '';

//     let favoritos = JSON.parse(localStorage.favoritos);
//     for(let i=0; i< favoritos.lenght; i++){

//             const item = document.createElement('li');
//             item.className = 'list-group-item';
//             item.innerHTML = favoritos[i].title;
            
//             contenedor.appendChild(item);
          
//     }
// }

//
const loadUser = async () => {
    let userName = JSON.parse(localStorage.users).name;
    document.getElementById("user-name").innerText = `${userName}`;

    let favoritIds = JSON.parse(localStorage.favoritos);
    console.log(`FAV IDST: ${favoritIds}`);

    let serie = [];
    let favList = [];
    for(let i=0; i < favoritIds.length; i++){
        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime/${favoritIds[i]}`);
            const data = await res.json();
            serie = data.data;
            console.log(`SERIE CONTENT ${i} : ${serie}`);
            favList.push(serie);
        } catch (e) {
            console.log("ERROR al cargar un anime por id en -> loadUser() from /userMenu/user.js", e);
        }

    }
    console.log(`FAVLIST: ${favList}`);
    return favList;
}; 

let favoritos = loadUser().then(result => {
    favoritos = result;

    const contenedor = document.querySelector('#list-favorites');
    contenedor.innerHTML = '';

   for(let i=0; i< favoritos.lenght; i++){

            const item = document.createElement('li');
            item.classList.add('list-group-item');
            item.innerText = favoritos[i].title;
            
            contenedor.appendChild(item);
    }
});