const loadUser = async () => {
    const users = localStorage.getItem('users');
    const favoritosRaw = localStorage.getItem('favoritos');

    if (!users || !favoritosRaw) {
        console.log("No se encontraron usuarios o favoritos en localStorage.");
        return [];
    }

    let userName = JSON.parse(users).name;
    document.querySelector("#user-name").innerText = `${userName}`;

    let favoritIds = JSON.parse(favoritosRaw);
    console.log(`FAV IDST: ${favoritIds}`);

    let favList = [];

    for (let i = 0; i < favoritIds.length; i++) {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime/${favoritIds[i]}`);
            const data = await res.json();
            console.log(`SERIE CONTENT ${i}:`, data.data);
            if(data){
                favList.push(data.data);
            }
        } catch (e) {
            console.log("ERROR al cargar un anime por id en -> loadUser() from /userMenu/user.js", e);
        }
    }

    console.log(`FAVLIST:`, favList);
    return favList;
};

loadUser().then(favoritos => {
    const contenedor = document.querySelector('#list-favorites');
    contenedor.innerHTML = '';

    for (let i = 0; i < favoritos.length; i++) {
        const item = document.createElement('li');
        item.classList.add('list-group-item', 'favorite-li');
        item.style.backgroundColor = 'lightblue';
        item.style.color = 'blue';
        item.innerText = favoritos[i].title;
        item.addEventListener('click', () => verDetalle(favoritos[i].mal_id));
        contenedor.appendChild(item);
    }

    // CARDS USER

    const contenedorCards = document.querySelector('#sub-container');
    contenedorCards.innerHTML = '';
            
    if(favoritos.length < 1){
        const voidTitle = document.createElement('h1');
        voidTitle.innerText = "No se encontro ningun Favorito";
        voidTitle.classList.add("subtitulo");
        contenedor.appendChild(voidTitle);
        return;
    }

    for (let i = 0; i < favoritos.length; i++) {
      crearTarjetaVacia(i);
    }

    const cardsMenu = document.getElementById('cardsMenu');
    const cards = cardsMenu.querySelectorAll('.card');
    
    for (let i = 0; i < favoritos.length; i++) {
      card = cards[i];

      let genres = "", title = "";
      for(let j = 0; j < favoritos[i].genres.length && j < 5; j++){
        if(j>0){genres += " / "}
        genres += favoritos[i].genres[j].name + " ";
      }
      if(favoritos[i].title_english == null){
        title = favoritos[i].title;
      }else{
        title = favoritos[i].title_english;
      }

      card.id = `${favoritos[i].mal_id}`;
      card.querySelector(".card-title").innerText = title;
      card.querySelector(".card-text").innerText = genres;
      card.classList.add("bg-custom"); 
      card.style.backgroundImage = `url('${favoritos[i].images.webp.image_url}')`;
  }
});

function verDetalle(cardId) {
  localStorage.setItem("detail", cardId);
  window.location.href = "/viewOne/anim.html";
}

function deleteFav(element) {
  const cardId = element.closest('.card').id;

  let favorites = JSON.parse(localStorage.getItem("favoritos")) || [];

  const idToRemove = parseInt(cardId);

  //favorites = favorites.filter(id => id !== idToRemove);
    favorites = favorites.filter(id => parseInt(id) !== idToRemove);

  localStorage.setItem("favoritos", JSON.stringify(favorites));

    location.reload();
  
}

// ##############################
    
function crearTarjetaVacia(i) {
  const col = document.createElement('div');
  col.className = 'col';

  col.innerHTML = `
      <div class="card" id="${i}">
      <img src="/logo.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Titulo</h5>
              <p class="card-text">Some quick example text.</p>
               <a onclick="verDetalles(this)" href="/viewOne/anim.html" class="btn btn-primary" id="details">Ver detalles</a>
               <a onclick="deleteFav(this)" class="btn btn-danger">Eliminar de Favoritos</a>
          </div>
      </div>
  `;
  col.classList.add("bg-custom");
  const contenedor = document.getElementById('sub-container');
  contenedor.appendChild(col);
}